'use client';

import { socials } from '../data/socials';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-retro bg-retro-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 lg:px-8 gap-2 sm:gap-4">
        <a href="#home" className="text-xs sm:text-base font-semibold uppercase tracking-[0.24em] sm:tracking-[0.34em] text-retro">
          Aryan Qureshi
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(socials.resume, '_blank')}
            aria-label="View resume and character stats"
            className="rpg-stats-button group relative px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]"
          >
            <span className="rpg-stats-arrow hidden sm:inline-block">▶</span>
            <span className="hidden sm:inline">View Stats</span>
            <span className="sm:hidden">Stats</span>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
