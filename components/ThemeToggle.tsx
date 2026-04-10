'use client';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={theme === 'light'}
      className="rpg-button inline-flex gap-2 border-retro bg-retro-panel text-retro focus:ring-purple/50"
    >
      <span className="text-base leading-none">{theme === 'dark' ? '🌙' : '🌞'}</span>
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
