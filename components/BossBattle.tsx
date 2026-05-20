'use client';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';

// ── Audio helper ──────────────────────────────────────────────────────────────
function playTone(
  freq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.07,
) {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('retro-muted') === 'true') return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Ctx = (window.AudioContext ?? (window as any).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => ctx.close(), duration * 1000 + 100);
  } catch { /* AudioContext unavailable */ }
}
function sfxAttack()  { playTone(440, 880, 0.09); }
function sfxHit()     { playTone(660, 220, 0.18); }
function sfxHeal()    { playTone(440, 880, 0.12); }
function sfxVictory() {
  [523, 659, 784, 1047].forEach((f, i) =>
    setTimeout(() => playTone(f, f * 1.05, 0.15), i * 120));
}
function sfxDefeat()  { playTone(440, 110, 0.4); }

// ── State machine ─────────────────────────────────────────────────────────────
type Phase = 'idle' | 'player_turn' | 'enemy_turn' | 'victory' | 'defeat';

interface State {
  phase:       Phase;
  playerHP:    number;
  playerMaxHP: number;
  enemyHP:     number;
  enemyMaxHP:  number;
  buffNextMove: boolean;
  log:         string[];
  wins:        number;
  isFinalBoss: boolean;
}

type Action =
  | { type: 'START' }
  | { type: 'PLAYER_MOVE'; move: MoveKey }
  | { type: 'ENEMY_MOVE_DONE' }
  | { type: 'RESET' }
  | { type: 'ADD_LOG'; line: string };

type MoveKey = 'SHIP_CODE' | 'READ_DOCS' | 'COMMIT_PUSH' | 'RUBBER_DUCK';

const PLAYER_MAX_HP = 25;
const ENEMY_HP_NORMAL = 28;
const ENEMY_HP_FINAL  = 42;

const ENEMY_MOVES = [
  { name: 'Self Doubt',                 damage: [3, 5] as [number, number] },
  { name: 'Comparison Trap',            damage: [4, 6] as [number, number] },
  { name: 'Tutorial Hell',              damage: [2, 4] as [number, number] },
  { name: '404: Confidence Not Found',  damage: [4, 6] as [number, number] },
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function storedWins() {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('boss-wins') ?? '0', 10);
}

function initialState(): State {
  const wins = storedWins();
  const isFinalBoss = wins >= 3;
  return {
    phase:        'idle',
    playerHP:     PLAYER_MAX_HP,
    playerMaxHP:  PLAYER_MAX_HP,
    enemyHP:      isFinalBoss ? ENEMY_HP_FINAL : ENEMY_HP_NORMAL,
    enemyMaxHP:   isFinalBoss ? ENEMY_HP_FINAL : ENEMY_HP_NORMAL,
    buffNextMove: false,
    log:          [],
    wins,
    isFinalBoss,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START': {
      const wins = storedWins();
      const isFinalBoss = wins >= 3;
      const maxHP = isFinalBoss ? ENEMY_HP_FINAL : ENEMY_HP_NORMAL;
      return {
        ...initialState(),
        phase:      'player_turn',
        enemyHP:    maxHP,
        enemyMaxHP: maxHP,
        wins,
        isFinalBoss,
        log: [`A wild ${isFinalBoss ? 'PERFECTIONISM' : 'IMPOSTER SYNDROME'} appeared!`],
      };
    }

    case 'PLAYER_MOVE': {
      if (state.phase !== 'player_turn') return state;
      const buff = state.buffNextMove;

      let lines: string[] = [];
      let newPlayerHP = state.playerHP;
      let newEnemyHP  = state.enemyHP;
      let newBuff     = false;

      switch (action.move) {
        case 'SHIP_CODE': {
          const miss = Math.random() < 0.2;
          if (miss) {
            lines = ['> You used SHIP CODE!', '> Merge conflict! The attack missed!'];
            sfxHit();
          } else {
            const dmg = rand(8, 12) + (buff ? 4 : 0);
            newEnemyHP = Math.max(0, state.enemyHP - dmg);
            lines = ['> You used SHIP CODE!', `> It's super effective! Enemy lost ${dmg} HP.`];
            sfxAttack();
          }
          break;
        }
        case 'READ_DOCS': {
          const heal = 6;
          newPlayerHP = Math.min(state.playerMaxHP, state.playerHP + heal);
          lines = ['> You used READ DOCS!', `> Recovered ${heal} HP.`];
          sfxHeal();
          break;
        }
        case 'COMMIT_PUSH': {
          const dmg = rand(5, 7) + (buff ? 4 : 0);
          newEnemyHP = Math.max(0, state.enemyHP - dmg);
          lines = ['> You used COMMIT & PUSH!', `> Pushed hard! Enemy lost ${dmg} HP.`];
          sfxAttack();
          break;
        }
        case 'RUBBER_DUCK': {
          newBuff = true;
          lines = ['> You consulted the RUBBER DUCK!', '> Next move is BUFFED (+4 DMG)!'];
          sfxHeal();
          break;
        }
      }

      if (newEnemyHP <= 0) {
        const newWins = state.wins + 1;
        if (typeof window !== 'undefined') localStorage.setItem('boss-wins', String(newWins));
        sfxVictory();
        return {
          ...state,
          phase:        'victory',
          enemyHP:      0,
          buffNextMove: false,
          wins:         newWins,
          log:          [...state.log, ...lines, '> VICTORY! You gained +1 CONFIDENCE.'],
        };
      }

      return {
        ...state,
        phase:        'enemy_turn',
        playerHP:     newPlayerHP,
        enemyHP:      newEnemyHP,
        buffNextMove: newBuff,
        log:          [...state.log.slice(-4), ...lines],
      };
    }

    case 'ENEMY_MOVE_DONE': {
      if (state.phase !== 'enemy_turn') return state;
      const move = ENEMY_MOVES[Math.floor(Math.random() * ENEMY_MOVES.length)];
      const dmg = rand(move.damage[0], move.damage[1]);
      const newPlayerHP = Math.max(0, state.playerHP - dmg);
      const lines = [
        `> Enemy used ${move.name}!`,
        `> You lost ${dmg} HP.`,
      ];
      sfxHit();

      if (newPlayerHP <= 0) {
        sfxDefeat();
        return {
          ...state,
          phase:     'defeat',
          playerHP:  0,
          log:       [...state.log.slice(-4), ...lines, '> GAME OVER. The bugs win this time...'],
        };
      }

      return {
        ...state,
        phase:    'player_turn',
        playerHP: newPlayerHP,
        log:      [...state.log.slice(-4), ...lines],
      };
    }

    case 'ADD_LOG':
      return { ...state, log: [...state.log.slice(-5), action.line] };

    case 'RESET': {
      return initialState();
    }

    default:
      return state;
  }
}

// ── Pixel sprite components ────────────────────────────────────────────────────
function ImposterSprite({ isFinal, shake }: { isFinal: boolean; shake: boolean }) {
  const color  = isFinal ? '#c084fc' : '#9f7aea';
  const color2 = isFinal ? '#a855f7' : '#7c3aed';
  const eyeCol = isFinal ? '#fbbf24' : '#ff00ff';

  return (
    <svg
      viewBox="0 0 16 16"
      width="80"
      height="80"
      className={`enemy-sprite${shake ? ' sprite-shake' : ''}`}
      style={{ imageRendering: 'pixelated' }}
      aria-label="Imposter Syndrome enemy sprite"
    >
      <rect x="4"  y="0"  width="8"  height="2" fill={color}  />
      <rect x="2"  y="2"  width="12" height="2" fill={color}  />
      <rect x="0"  y="4"  width="16" height="2" fill={color}  />
      <rect x="0"  y="6"  width="16" height="2" fill={color}  />
      {/* eyes */}
      <rect x="3"  y="5"  width="2"  height="2" fill={eyeCol} />
      <rect x="11" y="5"  width="2"  height="2" fill={eyeCol} />
      <rect x="0"  y="8"  width="16" height="2" fill={color2} />
      <rect x="0"  y="10" width="16" height="2" fill={color2} />
      <rect x="2"  y="12" width="12" height="2" fill={color2} />
      <rect x="4"  y="14" width="8"  height="2" fill={color2} />
    </svg>
  );
}

function HPBar({ current, max }: { current: number; max: number }) {
  const pct = max > 0 ? current / max : 0;
  const filled = Math.round(pct * 10);
  const bar = '▓'.repeat(filled) + '░'.repeat(10 - filled);
  const color = pct > 0.5 ? 'text-purple' : pct > 0.25 ? 'text-yellow-400' : 'text-red-400';
  return (
    <span className={`battle-hp-bar font-mono text-xs tracking-tight ${color}`}>
      {bar} {current}/{max}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function BossBattle() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [enemyShake, setEnemyShake]   = useState(false);
  const [playerShake, setPlayerShake] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [state.log]);

  // Enemy turn auto-fires after a short delay
  useEffect(() => {
    if (state.phase !== 'enemy_turn') return;
    const id = setTimeout(() => {
      setPlayerShake(true);
      setTimeout(() => setPlayerShake(false), 400);
      dispatch({ type: 'ENEMY_MOVE_DONE' });
    }, 800);
    return () => clearTimeout(id);
  }, [state.phase]);

  const playerMove = useCallback((move: MoveKey) => {
    if (state.phase !== 'player_turn') return;
    if (move !== 'READ_DOCS') {
      setEnemyShake(true);
      setTimeout(() => setEnemyShake(false), 300);
    }
    dispatch({ type: 'PLAYER_MOVE', move });
  }, [state.phase]);

  const bossName = state.isFinalBoss ? 'PERFECTIONISM' : 'IMPOSTER SYNDROME';

  return (
    <div className="battle-container">
      {state.phase === 'idle' ? (
        /* ── START SCREEN ── */
        <div className="battle-start-screen">
          <div className="battle-flavor">A wild {bossName} appeared!</div>
          {state.wins > 0 && (
            <p className="battle-wins-counter">BOSSES DEFEATED: {state.wins}</p>
          )}
          <button
            type="button"
            className="battle-start-btn"
            onClick={() => dispatch({ type: 'START' })}
          >
            ▶ START BATTLE
          </button>
        </div>
      ) : (
        /* ── ACTIVE BATTLE ── */
        <div className="battle-layout">
          {/* Enemy row */}
          <div className="battle-enemy-row">
            <div className="battle-combatant-info">
              <span className="battle-name">{bossName}</span>
              <HPBar current={state.enemyHP} max={state.enemyMaxHP} />
            </div>
            <ImposterSprite isFinal={state.isFinalBoss} shake={enemyShake} />
          </div>

          {/* Player row */}
          <div className="battle-player-row">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/Personal Portfolio/RetroImageSelf-Transparent.png"
                alt="Player avatar"
                fill
                className={`object-contain image-pixelated${playerShake ? ' sprite-shake' : ''}`}
                sizes="64px"
              />
            </div>
            <div className="battle-combatant-info">
              <span className="battle-name">ARYAN</span>
              <HPBar current={state.playerHP} max={state.playerMaxHP} />
              {state.buffNextMove && (
                <span className="battle-buff-indicator">⚡ BUFFED</span>
              )}
            </div>
          </div>

          {/* Log */}
          <div ref={logRef} className="battle-textbox">
            {state.log.map((line, i) => (
              <div key={i} className="battle-log-line">{line}</div>
            ))}
          </div>

          {/* Moves or end state */}
          {state.phase === 'player_turn' && (
            <div className="battle-moves">
              {([
                ['SHIP_CODE',    'SHIP CODE',      'High DMG · may miss'],
                ['READ_DOCS',    'READ DOCS',       'Heal +6 HP'],
                ['COMMIT_PUSH',  'COMMIT & PUSH',   'Med DMG · never misses'],
                ['RUBBER_DUCK',  'RUBBER DUCK',     'Buff next move'],
              ] as [MoveKey, string, string][]).map(([key, label, hint]) => (
                <button
                  key={key}
                  type="button"
                  className="battle-move-btn"
                  onClick={() => playerMove(key)}
                  title={hint}
                >
                  {label}
                  <span className="battle-move-hint">{hint}</span>
                </button>
              ))}
            </div>
          )}

          {state.phase === 'enemy_turn' && (
            <div className="battle-waiting">
              <span className="rpg-menu-pointer">▶</span> Enemy is thinking...
            </div>
          )}

          {(state.phase === 'victory' || state.phase === 'defeat') && (
            <div className="battle-end">
              {state.phase === 'victory' ? (
                <p className="battle-victory-text">
                  ★ VICTORY! BOSSES DEFEATED: {state.wins}
                </p>
              ) : (
                <p className="battle-defeat-text">
                  GAME OVER. The bugs win this time...
                </p>
              )}
              <button
                type="button"
                className="battle-start-btn"
                onClick={() => dispatch({ type: 'RESET' })}
              >
                {state.phase === 'victory' ? '[ PLAY AGAIN ]' : '[ RETRY ]'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
