'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMode } from '@/lib/mode';
import { game, useGameStats } from '@/lib/game';

const ART_RATIO = 480 / 1038;
const GROUND = 14; // ground strip height; sprites stand on top of it
const GRAVITY = 1900;
const JUMP = 660;
const DOUBLE_JUMP = 560;
const RUN_ACCEL = 1900;
const MAX_SPEED = 290;

interface Coin {
  id: number;
  x: number;
  y: number;
}
interface Bug {
  id: number;
  x: number;
  dir: 1 | -1;
  respawn: number; // seconds until it comes back after a stomp; 0 = alive
}
interface Pop {
  id: number;
  x: number;
  y: number;
  text: string;
  ttl: number;
}

/** Game mode only: Aryan becomes a playable character along the bottom of the screen. */
export function ArcadeGame() {
  const mode = useMode();
  return mode === 'game' ? <Arcade /> : null;
}

function Arcade() {
  const stats = useGameStats();
  const stripRef = useRef<HTMLDivElement>(null);
  const [, setFrame] = useState(0);
  const [line, setLine] = useState<string | null>('PLAYER 1 READY');
  const [banner, setBanner] = useState<string | null>(null);
  const [hint, setHint] = useState(true);
  const [charH, setCharH] = useState(76);
  const keys = useRef({ left: false, right: false });
  const lineTimer = useRef<ReturnType<typeof setTimeout>>();
  const w = useRef({
    x: 140,
    y: 0,
    vx: 0,
    vy: 0,
    facing: 1 as 1 | -1,
    jumps: 0,
    invuln: 0,
    jumpQueued: false,
    levelCoins: 0,
    seq: 0,
    width: 800,
    coins: [] as Coin[],
    bugs: [] as Bug[],
    pops: [] as Pop[],
  });

  const say = (text: string, ms = 1800) => {
    setLine(text);
    clearTimeout(lineTimer.current);
    lineTimer.current = setTimeout(() => setLine(null), ms);
  };
  const sayRef = useRef(say);
  sayRef.current = say;

  const reset = () => {
    const s = w.current;
    game.reset();
    Object.assign(s, { x: 140, y: 0, vx: 0, vy: 0, jumps: 0, invuln: 0, levelCoins: 0, coins: [], bugs: [], pops: [] });
    setBanner(null);
    say('round 2. let’s go!');
  };
  const resetRef = useRef(reset);
  resetRef.current = reset;

  useEffect(() => {
    const t = setTimeout(() => setLine(null), 2200);
    const h = setTimeout(() => setHint(false), 9000);
    const mq = window.matchMedia('(min-width: 1024px)');
    const size = () => setCharH(mq.matches ? 76 : 60);
    size();
    mq.addEventListener('change', size);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
      mq.removeEventListener('change', size);
    };
  }, []);

  // Keyboard controls (ignored while typing or while a dialog is open)
  useEffect(() => {
    const blocked = (e: KeyboardEvent) =>
      !!(e.target as HTMLElement).closest('input, textarea, [contenteditable="true"]') ||
      !!document.querySelector('[role="dialog"][aria-modal="true"]');

    const down = (e: KeyboardEvent) => {
      if (blocked(e) || e.metaKey || e.ctrlKey) return;
      const k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'a') keys.current.left = true;
      else if (k === 'arrowright' || k === 'd') keys.current.right = true;
      else if (k === 'arrowup' || k === 'w' || k === ' ') {
        if (!e.repeat) w.current.jumpQueued = true;
      } else if (k === 'r' && game.get().over) resetRef.current();
      else return;
      e.preventDefault();
      setHint(false);
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'a') keys.current.left = false;
      if (k === 'arrowright' || k === 'd') keys.current.right = false;
    };
    const onJump = () => (w.current.jumpQueued = true);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('avatar-jump', onJump);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('avatar-jump', onJump);
    };
  }, []);

  // Game loop
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const charW = charH * ART_RATIO;

    const pop = (x: number, y: number, text: string) => {
      const s = w.current;
      s.pops.push({ id: ++s.seq, x, y, text, ttl: 0.8 });
    };

    const spawnCoin = (level: number) => {
      const s = w.current;
      const heights = [10, 46, 96, 140, level >= 3 ? 175 : 120];
      let x = 0;
      for (let tries = 0; tries < 8; tries++) {
        x = 30 + Math.random() * Math.max(60, s.width - 60);
        if (Math.abs(x - s.x) > 90) break;
      }
      s.coins.push({ id: ++s.seq, x, y: heights[Math.floor(Math.random() * heights.length)] });
    };

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;
      const s = w.current;
      const st = game.get();
      s.width = stripRef.current?.clientWidth ?? s.width;

      if (!st.over) {
        // Run
        const dir = (keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0);
        if (dir) {
          s.vx += dir * RUN_ACCEL * dt;
          s.facing = dir as 1 | -1;
        } else {
          s.vx *= Math.pow(0.0008, dt);
        }
        s.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, s.vx));

        // Jump + double jump
        if (s.jumpQueued) {
          s.jumpQueued = false;
          if (s.y === 0) {
            s.vy = JUMP;
            s.jumps = 1;
          } else if (s.jumps < 2) {
            s.vy = DOUBLE_JUMP;
            s.jumps = 2;
            pop(s.x, s.y + 10, '✦');
          }
        }

        s.vy -= GRAVITY * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.y <= 0) {
          s.y = 0;
          s.vy = 0;
          s.jumps = 0;
        }
        s.x = Math.max(charW / 2, Math.min(s.width - charW / 2, s.x));
        if (s.invuln > 0) s.invuln -= dt;

        // Coins
        const target = 3 + Math.min(st.level, 5);
        while (s.coins.length < target) spawnCoin(st.level);
        s.coins = s.coins.filter((c) => {
          const hit = Math.abs(c.x - s.x) < charW / 2 + 10 && c.y + 8 > s.y - 6 && c.y < s.y + charH;
          if (!hit) return true;
          game.addScore(100);
          pop(c.x, c.y + 20, '+100');
          s.levelCoins += 1;
          return false;
        });

        // Level up after enough coins
        if (s.levelCoins >= 4 + st.level) {
          s.levelCoins = 0;
          game.levelUp();
          const lvl = game.get().level;
          s.coins = [];
          setBanner(`LEVEL ${lvl}`);
          setTimeout(() => setBanner(null), 1600);
          sayRef.current(lvl === 2 ? 'uh oh… bugs incoming 🐛' : 'LEVEL UP! +1 ♥');
        }

        // Bugs: one more every two levels, faster each level
        const wanted = st.level >= 2 ? Math.min(4, Math.ceil((st.level - 1) / 2)) : 0;
        while (s.bugs.length < wanted) {
          const fromRight = s.x < s.width / 2;
          s.bugs.push({ id: ++s.seq, x: fromRight ? s.width - 30 : 30, dir: fromRight ? -1 : 1, respawn: 0 });
        }
        const speed = 55 + st.level * 24;
        for (const b of s.bugs) {
          if (b.respawn > 0) {
            b.respawn -= dt;
            if (b.respawn <= 0) {
              const fromRight = s.x < s.width / 2;
              b.x = fromRight ? s.width - 30 : 30;
              b.dir = fromRight ? -1 : 1;
            }
            continue;
          }
          b.x += b.dir * speed * dt;
          if (b.x < 16 || b.x > s.width - 16) b.dir = (b.dir * -1) as 1 | -1;

          const overlap = Math.abs(b.x - s.x) < charW / 2 + 8;
          if (!overlap || s.y > 20) continue;
          if (s.vy < 0 && s.y > 4) {
            // Stomp
            b.respawn = 1.8;
            s.vy = 480;
            s.jumps = 1;
            game.addScore(250);
            pop(b.x, 36, '+250');
            sayRef.current('squashed it 🐛');
          } else if (s.invuln <= 0) {
            game.hit();
            s.invuln = 1.4;
            s.vy = 380;
            s.vx = (s.x < b.x ? -1 : 1) * 320;
            if (game.get().over) {
              setBanner('GAME OVER');
              sayRef.current('…respawn?', 4000);
            } else {
              sayRef.current('ouch!');
            }
          }
        }
      }

      for (const p of s.pops) p.ttl -= dt;
      s.pops = s.pops.filter((p) => p.ttl > 0);

      setFrame((f) => (f + 1) % 1e6);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [charH]);

  const s = w.current;
  const charW = charH * ART_RATIO;
  const moving = Math.abs(s.vx) > 25 && s.y === 0;
  const press = (k: 'left' | 'right', v: boolean) => {
    keys.current[k] = v;
    if (v) setHint(false);
  };

  return (
    <div
      ref={stripRef}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] h-[280px] select-none lg:left-56"
      aria-label="Arcade mini-game"
    >
      {/* Ground */}
      <div
        className="absolute inset-x-0 bottom-0 border-t-2 border-accent"
        style={{
          height: GROUND,
          backgroundImage:
            'repeating-linear-gradient(90deg, #2a2160 0 14px, #1c1740 14px 16px), repeating-linear-gradient(0deg, transparent 0 6px, #120e26 6px 7px)',
        }}
      />

      {/* Coins */}
      {s.coins.map((c) => (
        <span
          key={c.id}
          className="coin-spin absolute block h-4 w-4 border-2 border-black bg-accent shadow-[inset_-3px_-3px_0_#c99a12]"
          style={{ left: c.x - 8, bottom: GROUND + c.y }}
          aria-hidden="true"
        />
      ))}

      {/* Bugs */}
      {s.bugs.map((b) =>
        b.respawn > 0 ? null : (
          <svg
            key={b.id}
            viewBox="0 0 13 8"
            className="absolute h-[18px] w-[30px]"
            style={{ left: b.x - 15, bottom: GROUND, transform: `scaleX(${b.dir})` }}
            shapeRendering="crispEdges"
            aria-hidden="true"
          >
            <rect x="2" y="1" width="9" height="5" fill="#ff4f9a" />
            <rect x="1" y="2" width="11" height="3" fill="#ff4f9a" />
            <rect x="9" y="2" width="1" height="1" fill="#000" />
            <rect x="11" y="2" width="1" height="1" fill="#fff" />
            <rect x="0" y="1" width="1" height="1" fill="#ff4f9a" />
            <rect x="2" y="6" width="1" height="2" fill="#000" />
            <rect x="5" y="6" width="1" height="2" fill="#000" />
            <rect x="8" y="6" width="1" height="2" fill="#000" />
            <rect x="4" y="1" width="1" height="4" fill="#c2286b" />
            <rect x="7" y="1" width="1" height="4" fill="#c2286b" />
          </svg>
        ),
      )}

      {/* Player */}
      <button
        type="button"
        aria-label="Aryan, the player: click to jump"
        onPointerDown={(e) => {
          e.stopPropagation();
          w.current.jumpQueued = true;
          setHint(false);
        }}
        className="pointer-events-auto absolute"
        style={{ left: s.x - charW / 2, bottom: GROUND + s.y, width: charW, height: charH }}
      >
        <span className={`block h-full w-full ${moving ? 'walk-bob' : ''} ${s.invuln > 0 ? 'hurt-blink' : ''}`}>
          <Image
            src="/character.png"
            alt=""
            width={480}
            height={1038}
            priority
            draggable={false}
            className="h-full w-full"
            style={{ transform: `scaleX(${s.facing})` }}
          />
        </span>
        {line && (
          <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border-2 border-black bg-[#eeeaff] px-2 py-1 font-pixel text-[0.5rem] text-[#120e26] shadow-[3px_3px_0_#000]">
            {line}
          </span>
        )}
      </button>

      {/* Floating score pops */}
      {s.pops.map((p) => (
        <span
          key={p.id}
          className="absolute -translate-x-1/2 font-pixel text-[0.55rem] text-accent [text-shadow:2px_2px_0_#000]"
          style={{ left: p.x, bottom: GROUND + p.y + (0.8 - p.ttl) * 50, opacity: Math.min(1, p.ttl * 2) }}
          aria-hidden="true"
        >
          {p.text}
        </span>
      ))}

      {/* Level banner / game over */}
      {banner && (
        <div className="absolute inset-x-0 top-4 flex flex-col items-center gap-3">
          <p className="font-pixel text-lg text-accent [text-shadow:3px_3px_0_#ff4f9a,6px_6px_0_#000] sm:text-2xl">{banner}</p>
          {stats.over && (
            <button
              type="button"
              onClick={reset}
              className="pointer-events-auto border-2 border-black bg-accent px-3 py-2 font-pixel text-[0.6rem] text-[#120e26] shadow-[3px_3px_0_#000] hover:-translate-y-0.5"
            >
              ↻ RETRY (R)
            </button>
          )}
        </div>
      )}

      {/* First-run hint */}
      {hint && !banner && !line && (
        <p className="blink absolute inset-x-0 bottom-[96px] text-center font-pixel text-[0.5rem] text-[#eeeaff] [text-shadow:2px_2px_0_#000] sm:text-[0.6rem]">
          <span className="hidden sm:inline">← → MOVE · ↑ JUMP (x2) · </span>COLLECT COINS · STOMP BUGS
        </p>
      )}

      {/* Touch controls */}
      <div className="pointer-events-auto absolute bottom-[26px] right-3 flex gap-2 lg:hidden">
        {(
          [
            ['◀', 'left'],
            ['▶', 'right'],
          ] as const
        ).map(([label, k]) => (
          <button
            key={k}
            type="button"
            aria-label={`Move ${k}`}
            onPointerDown={() => press(k, true)}
            onPointerUp={() => press(k, false)}
            onPointerLeave={() => press(k, false)}
            onPointerCancel={() => press(k, false)}
            className="h-12 w-12 touch-none border-2 border-black bg-[#2a2160]/90 font-pixel text-sm text-[#eeeaff] shadow-[3px_3px_0_#000] active:translate-y-0.5"
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          aria-label="Jump"
          onPointerDown={() => {
            w.current.jumpQueued = true;
            setHint(false);
          }}
          className="h-12 w-12 touch-none border-2 border-black bg-accent font-pixel text-sm text-[#120e26] shadow-[3px_3px_0_#000] active:translate-y-0.5"
        >
          ▲
        </button>
      </div>
    </div>
  );
}
