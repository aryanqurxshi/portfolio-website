'use client';

import { socials } from '../data/socials';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-retro bg-retro-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="text-base font-semibold uppercase tracking-[0.34em] text-retro md:text-lg">
          Aryan Qureshi
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(socials.resume, '_blank')}
            aria-label="View resume and character stats"
            className="rpg-stats-button group relative px-5 py-2.5 text-sm font-bold uppercase tracking-[0.2em]"
          >
            <span className="rpg-stats-arrow">▶</span>
            <span>View Stats</span>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
