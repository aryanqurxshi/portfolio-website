'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { signals, toggleMode, toggleTheme } from '@/lib/mode';

interface Command {
  id: string;
  label: string;
  icon: string;
  hint: string;
  group: 'Jump to' | 'Projects' | 'Do something';
  run: () => void;
}

const go = (hash: string) => {
  window.location.hash = hash;
};

function buildCommands(): Command[] {
  return [
    { id: 'me', label: 'me', icon: '🏠', hint: '01', group: 'Jump to', run: () => window.scrollTo({ top: 0 }) },
    { id: 'work', label: 'work', icon: '💼', hint: '02', group: 'Jump to', run: () => go('work') },
    { id: 'projects', label: 'projects', icon: '🛠️', hint: '03', group: 'Jump to', run: () => go('projects') },
    { id: 'awards', label: 'awards', icon: '🏆', hint: '04', group: 'Jump to', run: () => go('awards') },
    { id: 'education', label: 'education', icon: '🎓', hint: '05', group: 'Jump to', run: () => go('education') },
    ...projects.map<Command>((p) => ({
      id: `p-${p.slug}`,
      label: p.title,
      icon: '◆',
      hint: p.tagline,
      group: 'Projects',
      run: () => go(`project-${p.slug}`),
    })),
    { id: 'game', label: 'toggle game mode', icon: '🎮', hint: 'theme', group: 'Do something', run: toggleMode },
    { id: 'theme', label: 'toggle dark mode', icon: '🌗', hint: 'theme', group: 'Do something', run: toggleTheme },
    { id: 'jump', label: 'make aryan jump', icon: '🦘', hint: 'fun', group: 'Do something', run: signals.avatarJump },
    { id: 'email', label: 'email me', icon: '✉️', hint: '@', group: 'Do something', run: () => (window.location.href = `mailto:${profile.email}`) },
    { id: 'resume', label: 'open resume', icon: '📄', hint: 'pdf', group: 'Do something', run: () => window.open(profile.resume, '_blank') },
  ];
}

/** "/" or ⌘K opens a quick jump / action menu, styled after a terminal palette. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = useMemo(buildCommands, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setIndex(0);
  }, []);

  const run = useCallback(
    (c: Command) => {
      close();
      // Let the dialog unmount before scrolling or toggling.
      requestAnimationFrame(c.run);
    },
    [close],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.closest('input, textarea, [contenteditable="true"]');
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && results[index]) run(results[index]);
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="pixel-frame w-full max-w-[440px] overflow-hidden rounded-xl border border-divider bg-background shadow-2xl"
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-divider/60 px-4">
              <span className="text-tertiary" aria-hidden="true">
                ⌕
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="search or jump to…"
                aria-label="Search commands"
                className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-tertiary"
              />
              <kbd className="rounded border border-divider px-1.5 text-[10px] text-tertiary">esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-1.5" role="listbox">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-tertiary">nothing found</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                return (
                  <li key={c.id} role="option" aria-selected={i === index}>
                    {header && (
                      <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-tertiary">
                        {header}
                      </p>
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => run(c)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                        i === index ? 'bg-well text-foreground game:bg-accent game:text-[#120e26]' : 'text-foreground/80'
                      }`}
                    >
                      <span className="w-5 text-center" aria-hidden="true">
                        {c.icon}
                      </span>
                      <span className="flex-1 truncate">{c.label}</span>
                      <span className="max-w-[45%] truncate text-xs text-tertiary">{c.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
