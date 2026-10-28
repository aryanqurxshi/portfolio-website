'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import { signals, toggleTheme } from '@/lib/mode';
import { useActiveSection } from '@/lib/useActiveSection';
import { GameToggle } from './GameToggle';
import { SocialIcons } from './SocialIcons';

const LINKS = [
  { id: 'top', label: 'me' },
  { id: 'work', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'awards', label: 'awards' },
  { id: 'education', label: 'education' },
] as const;
const IDS = LINKS.map((l) => l.id);

function Headshot({ size }: { size: number }) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      <Image
        src="/headshot.jpg"
        alt="Aryan Qureshi"
        width={size * 2}
        height={size * 2}
        className="pixel-frame h-full w-full rounded-full object-cover ring-2 ring-divider ring-offset-2 ring-offset-background game:ring-0"
        priority
      />
      <span
        className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500"
        title="open to internships"
      />
    </span>
  );
}

function CornerBody({ onNavigate }: { onNavigate?: () => void }) {
  const active = useActiveSection(IDS) ?? 'top';

  return (
    <div className="flex h-full flex-col">
      <a href="#top" onClick={onNavigate} className="group block w-fit">
        <Headshot size={64} />
      </a>
      <p className="mt-3 text-xs tracking-wide text-tertiary game:font-pixel game:text-[0.55rem]">aryan&apos;s corner</p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/70">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        building VaultQ
      </p>

      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          signals.openPalette();
        }}
        className="mt-7 flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground/70 hover:bg-well hover:text-foreground"
      >
        search
        <kbd className="rounded border border-divider px-1.5 text-[10px] text-tertiary">/</kbd>
      </button>

      <nav className="mt-3 flex flex-col gap-0.5" aria-label="Aryan's corner">
        {LINKS.map((l, i) => {
          const on = active === l.id;
          return (
            <a
              key={l.id}
              href={l.id === 'top' ? '#top' : `#${l.id}`}
              onClick={onNavigate}
              aria-current={on ? 'true' : undefined}
              className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-[15px] transition-colors ${
                on ? 'bg-well text-foreground game:bg-accent game:text-[#120e26]' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-1 w-1 rounded-full transition-all ${on ? 'bg-foreground game:bg-[#120e26]' : 'bg-transparent'}`} />
                {l.label}
              </span>
              <span className="text-[10px] tabular-nums text-tertiary opacity-0 transition-opacity group-hover:opacity-100">
                0{i + 1}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 pt-8">
        <GameToggle variant="switch" />
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between gap-3 text-sm text-foreground/70 hover:text-foreground game:hidden"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden="true">◐</span>
            dark mode
          </span>
          <kbd className="rounded border border-divider px-1.5 text-[10px] text-tertiary">toggle</kbd>
        </button>
        <div className="flex items-center justify-between border-t border-divider/60 pt-3">
          <SocialIcons className="flex" />
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-xs text-tertiary hover:text-foreground">
            resume ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * "Aryan's corner": a fixed side tab on desktop; on smaller screens a floating
 * headshot button opens the same panel as a drawer.
 */
export function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-divider/50 bg-background/60 px-5 py-10 backdrop-blur lg:block">
        <CornerBody />
      </aside>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Aryan's corner"
        className="fixed bottom-5 left-4 z-40 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        <Headshot size={48} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Aryan's corner"
              className="h-full w-64 max-w-[80vw] border-r border-divider bg-background px-5 py-8 shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CornerBody onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
