'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'button, a[href], [role="menuitem"]';
const TRAIL_INTERVAL_MS = 28; // ~35fps throttle

export function RetroEffects() {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  // Sync muted state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('retro-muted');
    const val = stored === 'true';
    setMuted(val);
    mutedRef.current = val;
  }, []);

  const toggleMute = () => {
    const next = !mutedRef.current;
    setMuted(next);
    mutedRef.current = next;
    localStorage.setItem('retro-muted', String(next));
  };

  // Cursor trail
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    let last = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < TRAIL_INTERVAL_MS) return;
      last = now;

      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);

      // Trigger fade on next frame so transition applies
      requestAnimationFrame(() => {
        requestAnimationFrame(() => dot.classList.add('fading'));
      });
      setTimeout(() => dot.remove(), 600);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Click: flash on element + 8-bit blip
  useEffect(() => {
    const playBlip = () => {
      if (mutedRef.current) return;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Ctx = (window.AudioContext ?? (window as any).webkitAudioContext) as typeof AudioContext;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
        setTimeout(() => ctx.close(), 300);
      } catch {
        // AudioContext not available — silently skip
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!el) return;

      el.classList.add('is-clicking');
      setTimeout(() => el.classList.remove('is-clicking'), 140);

      playBlip();
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMute}
      title={muted ? 'Unmute 8-bit sounds' : 'Mute 8-bit sounds'}
      aria-label={muted ? 'Unmute 8-bit sounds' : 'Mute 8-bit sounds'}
      className="mute-toggle"
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
