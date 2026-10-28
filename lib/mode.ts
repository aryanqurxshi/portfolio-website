'use client';

import { useEffect, useState } from 'react';

export type Mode = 'normal' | 'game';

const EVENT = 'modechange';

export function getMode(): Mode {
  return document.documentElement.dataset.mode === 'game' ? 'game' : 'normal';
}

export function setMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  try {
    localStorage.setItem('mode', mode);
  } catch {}
  window.dispatchEvent(new CustomEvent<Mode>(EVENT, { detail: mode }));
}

export function toggleMode() {
  setMode(getMode() === 'game' ? 'normal' : 'game');
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {}
}

/** Current site mode; re-renders when game mode is switched on or off. */
export function useMode(): Mode {
  const [mode, setState] = useState<Mode>('normal');
  useEffect(() => {
    setState(getMode());
    const onChange = () => setState(getMode());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return mode;
}

/** Fire-and-forget signals between components that do not share a parent. */
export const signals = {
  openPalette: () => window.dispatchEvent(new Event('open-palette')),
  avatarJump: () => window.dispatchEvent(new Event('avatar-jump')),
};
