'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-visited';
const STEPS = 12;
const STEP_MS = 100; // 1.2 s total

export function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show only on first visit
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(true);

    let step = 0;
    const id = setInterval(() => {
      step++;
      setProgress(step);
      if (step >= STEPS) {
        clearInterval(id);
        setTimeout(() => setVisible(false), 200);
      }
    }, STEP_MS);

    // Skip on any keypress
    const skip = () => { clearInterval(id); setVisible(false); };
    window.addEventListener('keydown', skip, { once: true });

    return () => {
      clearInterval(id);
      window.removeEventListener('keydown', skip);
    };
  }, []);

  if (!visible) return null;

  const filled = Math.round((progress / STEPS) * 20);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
  const pct = Math.round((progress / STEPS) * 100);

  return (
    <div
      className="boot-overlay"
      role="status"
      aria-label="Loading portfolio"
      onClick={() => setVisible(false)}
    >
      <p className="boot-title text-purple text-xs tracking-[0.2em]">ARYAN_QURESHI.EXE</p>
      <p className="boot-subtitle mt-4 text-purple/60 text-xs tracking-[0.12em]">
        LOADING SAVE FILE...
      </p>
      <div className="boot-bar-text mt-3 text-purple/80 text-xs font-mono tracking-tight">
        {bar} {pct}%
      </div>
      <p className="mt-6 text-purple/30 text-xs tracking-[0.1em]">
        PRESS ANY KEY TO SKIP
      </p>
    </div>
  );
}
