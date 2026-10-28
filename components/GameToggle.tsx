'use client';

import { toggleMode, useMode } from '@/lib/mode';

function GamepadIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 11h4M8 9v4M15 12h.01M18 10h.01" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59l-.92 7.5A2.5 2.5 0 0 0 4.27 19c.94 0 1.8-.53 2.23-1.37L8 15h8l1.5 2.63A2.5 2.5 0 0 0 19.73 19a2.5 2.5 0 0 0 2.49-2.91l-.92-7.5A4 4 0 0 0 17.32 5z" />
    </svg>
  );
}

interface GameToggleProps {
  /** corner: floating "press start" pill · switch: labelled row · icon: compact button */
  variant?: 'corner' | 'switch' | 'icon';
  className?: string;
}

export function GameToggle({ variant = 'icon', className = '' }: GameToggleProps) {
  const mode = useMode();
  const on = mode === 'game';
  const label = on ? 'Exit game mode' : 'Switch to game mode';

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleMode}
        aria-pressed={on}
        aria-label={label}
        className={`shrink-0 transition-opacity hover:opacity-70 ${on ? 'text-accent' : 'text-foreground'} ${className}`}
      >
        <GamepadIcon />
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        type="button"
        onClick={toggleMode}
        aria-pressed={on}
        aria-label={label}
        className={`group flex w-full items-center justify-between gap-3 text-sm text-foreground/70 hover:text-foreground ${className}`}
      >
        <span className="flex items-center gap-2">
          <GamepadIcon className="h-4 w-4" />
          game mode
        </span>
        <span
          className={`relative h-5 w-9 rounded-full border transition-colors ${
            on ? 'border-accent bg-well' : 'border-divider bg-well'
          }`}
        >
          <span
            className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all ${
              on ? 'left-[18px] bg-accent' : 'left-0.5 bg-foreground/60'
            }`}
          />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-pressed={on}
      aria-label={label}
      className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 ${
        on
          ? 'border-accent bg-background/90 text-accent game:font-pixel game:text-[0.6rem]'
          : 'border-divider bg-background/80 text-foreground/80 hover:text-foreground'
      } ${className}`}
    >
      <GamepadIcon className="h-4 w-4" />
      {on ? <span>EXIT GAME</span> : <span>press start</span>}
      <span
        className={`relative ml-1 h-4 w-7 rounded-full transition-colors ${on ? 'bg-accent' : 'bg-foreground/15'}`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all ${on ? 'left-[14px]' : 'left-0.5'}`}
        />
      </span>
    </button>
  );
}
