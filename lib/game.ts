'use client';

import { useSyncExternalStore } from 'react';

/** Score / lives / level shared by the arcade mini-game and the HUD. */
export interface GameStats {
  score: number;
  hearts: number;
  level: number;
  over: boolean;
}

export const MAX_HEARTS = 5;
const START: GameStats = { score: 0, hearts: 3, level: 1, over: false };
const KEY = 'game-stats';

let stats: GameStats = START;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (saved && typeof saved.score === 'number') stats = { ...START, ...saved, over: false };
  } catch {}
}

function set(next: Partial<GameStats>) {
  stats = { ...stats, ...next };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(stats));
  } catch {}
  listeners.forEach((l) => l());
}

export const game = {
  get: () => {
    load();
    return stats;
  },
  addScore: (n: number) => set({ score: stats.score + n }),
  levelUp: () => set({ level: stats.level + 1, hearts: Math.min(MAX_HEARTS, stats.hearts + 1) }),
  hit: () => {
    const hearts = stats.hearts - 1;
    set({ hearts, over: hearts <= 0 });
  },
  reset: () => set({ ...START }),
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useGameStats(): GameStats {
  return useSyncExternalStore(game.subscribe, game.get, () => START);
}
