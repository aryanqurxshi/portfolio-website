'use client';

import { useEffect, useRef, useState } from 'react';
import { useMode } from '@/lib/mode';

interface Coin {
  id: number;
  x: number;
  y: number;
  label: string;
}

const SCORE_KEY = 'game-score';

/**
 * Everything that only exists in game mode: CRT overlay, the HUD, coins that
 * pop where you click, and a short boot screen when the mode switches on.
 */
export function GameLayer() {
  const mode = useMode();
  const on = mode === 'game';
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [boot, setBoot] = useState(false);
  const seq = useRef(0);

  useEffect(() => {
    try {
      setScore(Number(sessionStorage.getItem(SCORE_KEY)) || 0);
    } catch {}
  }, []);

  // Boot screen when the toggle is flipped on (modechange only fires on a
  // toggle, so reloading in game mode skips it).
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onChange = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== 'game') return;
      setBoot(true);
      clearTimeout(t);
      t = setTimeout(() => setBoot(false), 1100);
    };
    window.addEventListener('modechange', onChange);
    return () => {
      window.removeEventListener('modechange', onChange);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      const big = !!target.closest('a, button, [role="button"], .hl');
      const gain = big ? 50 : 10;
      const id = ++seq.current;
      setCoins((c) => [...c.slice(-12), { id, x: e.clientX, y: e.clientY, label: `+${gain}` }]);
      setScore((s) => {
        const next = s + gain;
        try {
          sessionStorage.setItem(SCORE_KEY, String(next));
        } catch {}
        return next;
      });
      setTimeout(() => setCoins((c) => c.filter((k) => k.id !== id)), 800);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [on]);

  if (!on) return null;

  const level = 1 + Math.floor(score / 500);

  return (
    <>
      <div className="crt pointer-events-none fixed inset-0 z-[80]" aria-hidden="true" />

      <div
        className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-4 whitespace-nowrap border-2 border-black bg-[#1c1740] px-4 py-2 font-pixel text-[0.55rem] text-[#eeeaff] shadow-[4px_4px_0_#000] sm:text-[0.6rem] lg:left-[calc(50%+7rem)]"
        aria-label={`Score ${score}, level ${level}`}
      >
        <span className="hidden text-accent sm:inline">P1 ARYAN</span>
        <span className="text-[#ff4f9a]" aria-hidden="true">
          ♥♥♥
        </span>
        <span>
          SCORE <span className="text-accent">{String(score).padStart(6, '0')}</span>
        </span>
        <span className="hidden sm:inline">LVL {level}</span>
      </div>

      {coins.map((c) => (
        <span
          key={c.id}
          className="coin-pop pointer-events-none fixed z-[85] flex items-center gap-1 font-pixel text-[0.6rem] text-accent [text-shadow:2px_2px_0_#000]"
          style={{ left: c.x, top: c.y }}
          aria-hidden="true"
        >
          <span className="inline-block h-3 w-3 border-2 border-black bg-accent" />
          {c.label}
        </span>
      ))}

      {boot && (
        <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-[#0f0c22] font-pixel text-[#eeeaff]">
          <p className="text-xl text-accent [text-shadow:4px_4px_0_#ff4f9a] sm:text-3xl">ARYAN.EXE</p>
          <p className="blink text-xs sm:text-sm">PRESS START</p>
          <div className="h-3 w-48 border-2 border-[#eeeaff] p-0.5">
            <div className="h-full animate-[boot_1s_steps(10)_forwards] bg-accent" style={{ width: 0 }} />
          </div>
        </div>
      )}
    </>
  );
}
