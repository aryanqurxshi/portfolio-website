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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onPointerDown={(event) => {
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
            className="relative mx-auto w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2rem] border-2 border-retro bg-retro-panel text-retro shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_30px_80px_rgba(124,58,237,0.22)]"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-black/80 px-4 sm:px-6 py-4 sm:py-5">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-purple/80 truncate">RPG Menu</p>
                <h2 id="rpg-panel-title" className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[0.04em] text-retro truncate">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-5 sm:leading-7 text-retro/70\">{subtitle}</p>
                ) : null}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-retro transition hover:border-purple/40 hover:bg-purple/10 focus:outline-none focus:ring-2 focus:ring-purple/50"
              >
                ×
              </button>
            </div>
            <div className="max-h-[calc(100vh-140px)] overflow-y-auto px-6 py-8 sm:px-8">
              {children}
            </div>
            <div className="rpg-divider" />
            <div className="rpg-panel-corners">
              <div className="rpg-corner rpg-corner-tl" />
              <div className="rpg-corner rpg-corner-tr" />
              <div className="rpg-corner rpg-corner-bl" />
              <div className="rpg-corner rpg-corner-br" />
            </div>
            <div className="rpg-scanlines" />
            <div className="rpg-particles" />
            <div className="rpg-status-bar" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
