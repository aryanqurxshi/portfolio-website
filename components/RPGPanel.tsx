'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

interface RPGPanelProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function RPGPanel({ title, subtitle, isOpen, onClose, children }: RPGPanelProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rpg-panel-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="pointer-events-auto relative mx-auto w-full max-w-5xl flex flex-col max-h-[85vh] rounded-[2rem] border-2 border-retro bg-retro-panel text-retro shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_60px_rgba(124,58,237,0.15)]"
          >
            <div className="flex-shrink-0 border-b border-retro/50 bg-gradient-to-r from-black/60 via-black/40 to-black/60 px-6 sm:px-8 py-5 sm:py-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.32em] text-purple/70">Menu</p>
                  <h2 id="rpg-panel-title" className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-retro">
                    {title}
                  </h2>
                  {subtitle ? (
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-retro/75 max-w-2xl">{subtitle}</p>
                  ) : null}
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-retro/40 bg-retro-surface text-lg text-retro transition hover:border-purple/60 hover:bg-purple/15 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:ring-offset-1 focus:ring-offset-black"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
