'use client';

import { useEffect, useState } from 'react';
import { navLinks, profile } from '@/data/profile';
import { ThemeToggle } from './ThemeToggle';
import { SocialIcons } from './SocialIcons';

/** Slides in once the main nav scrolls away, and underlines the section in view. */
export function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-divider/50 bg-background/95 backdrop-blur transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-6">
        <a href="#" className="shrink-0 font-display text-xl italic tracking-tight">
          {profile.name}
        </a>
        <nav className="hidden gap-6 text-sm sm:flex" aria-label="Sticky">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`underline-offset-[6px] transition-colors hover:text-foreground ${
                active === l.id ? 'text-foreground underline decoration-tertiary' : 'text-foreground/60'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <SocialIcons className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </div>
      {/* Mobile: section tabs as a scrollable row under the name */}
      <nav
        className="mx-auto flex max-w-page gap-5 overflow-x-auto px-6 pb-2 text-sm sm:hidden"
        aria-label="Sticky mobile"
      >
        {navLinks.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`shrink-0 ${active === l.id ? 'text-foreground' : 'text-foreground/60'}`}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
