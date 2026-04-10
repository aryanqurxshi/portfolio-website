'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { PixelPortrait } from './PixelPortrait';

interface MenuOption {
  key: string;
  label: string;
  description: string;
  icon: string;
}

interface HeroSectionProps {
  menuOptions: readonly MenuOption[];
  onSelect: (key: string) => void;
  isPanelOpen: boolean;
  onClosePanel: () => void;
}

export function HeroSection({ menuOptions, onSelect, isPanelOpen, onClosePanel }: HeroSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (hover: hover)');

    const updateDesktop = () => setIsDesktop(query.matches);
    updateDesktop();
    query.addEventListener('change', updateDesktop);

    return () => query.removeEventListener('change', updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPanelOpen) {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClosePanel();
        }
        return;
      }

      if (!menuRef.current?.contains(event.target as Node)) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % menuOptions.length);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + menuOptions.length) % menuOptions.length);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        onSelect(menuOptions[selectedIndex].key);
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDesktop, isPanelOpen, menuOptions, onClosePanel, onSelect, selectedIndex]);

  useEffect(() => {
    if (!isPanelOpen) {
      itemRefs.current[selectedIndex]?.focus({ preventScroll: true });
    }
  }, [isPanelOpen, selectedIndex]);

  return (
    <section id="home" className="relative overflow-hidden rpg-panel px-6 py-0 sm:px-8 sm:py-0">
      <div className="rpg-panel-corners">
        <div className="rpg-corner rpg-corner-tl" />
        <div className="rpg-corner rpg-corner-tr" />
        <div className="rpg-corner rpg-corner-bl" />
        <div className="rpg-corner rpg-corner-br" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-transparent opacity-80" />
      <div className="absolute left-6 top-10 h-24 w-24 rounded-full border border-purple/15 blur-2xl opacity-80" />
      <div className="absolute right-10 top-24 h-28 w-28 rounded-full border border-purple/10 opacity-60" />
      <div className="absolute left-0 bottom-8 h-16 w-16 rounded-full bg-purple/10 blur-sm opacity-90" />
      <div className="absolute right-0 bottom-20 h-20 w-20 rounded-full bg-white/5 blur-sm" />
      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="rpg-panel-soft p-6">
            <p className="text-xs uppercase tracking-[0.46em] text-purple/80">Character Portrait</p>
            <div className="rpg-status-bar" />
            <div className="relative mt-6 flex flex-col items-center gap-6">
              <div className="hero-portrait-hud absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-purple/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm">
                <span>Level 18</span>
                <span className="h-2 w-2 rounded-full bg-purple" />
                <span>HP 128 / 128</span>
              </div>
              <PixelPortrait />
              <div className="rounded-[1.75rem] border border-retro bg-retro-surface px-5 py-4 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-purple/80">Player</p>
                <p className="mt-2 text-2xl font-semibold text-retro sm:text-3xl">Aryan Qureshi</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="rpg-panel p-6"
          >
            <div className="flex flex-col gap-6 border-b border-retro pb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-purple/80">Character Profile</p>
                <h1 className="retro-heading mt-4 text-6xl font-black tracking-[0.08em] text-retro sm:text-7xl">
                  Aryan Qureshi
                </h1>
                <p className="mt-3 text-base uppercase tracking-[0.28em] text-purple/80 sm:text-lg">{profile.title}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-retro bg-retro-surface p-4">
                  <p className="text-sm uppercase tracking-[0.28em] text-purple/80">Location</p>
                  <p className="mt-2 text-lg font-semibold text-retro">Ottawa, Canada</p>
                </div>
                <div className="rounded-[1.75rem] border border-retro bg-retro-surface p-4">
                  <p className="text-sm uppercase tracking-[0.28em] text-purple/80">School</p>
                  <p className="mt-2 text-lg font-semibold text-retro">University of Ottawa</p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-retro bg-retro-surface p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-purple/80">About</p>
              <p className="mt-3 text-base leading-8 text-gray-300 sm:text-lg">{profile.intro}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: 'easeOut' }}
            className="rpg-panel p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.28em] text-purple/80">Command Menu</p>
              <span className="rpg-menu-pointer">▶</span>
            </div>
            <div ref={menuRef} className="grid gap-3" role="menu" aria-orientation="vertical" aria-label="Portfolio menu">
              {menuOptions.map((option, index) => {
                const isActive = selectedIndex === index;
                return (
                  <button
                    key={option.key}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => onSelect(option.key)}
                    onFocus={() => setSelectedIndex(index)}
                    className={`rpg-menu-item ${isActive ? 'rpg-menu-item-active' : ''}`}
                    role="menuitem"
                    aria-selected={isActive}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="space-y-1">
                      <p className="rpg-menu-label">
                        {isActive && <span className="rpg-menu-pointer">▶</span>}
                        {option.label}
                      </p>
                      <p className="max-w-xl rpg-menu-description">{option.description}</p>
                    </div>
                    <span className="rpg-menu-icon">{option.icon}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="rpg-scanlines" />
      <div className="rpg-particles" />
    </section>
  );
}
