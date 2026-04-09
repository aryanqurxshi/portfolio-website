'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socials } from '../data/socials';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Awards', href: '#awards' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'GitHub', href: '#github' },
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const onScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const current = sections
        .map((section, index) => ({ section, index }))
        .filter((entry) => entry.section)
        .reverse()
        .find(({ section }) => section!.getBoundingClientRect().top + window.scrollY <= scrollPosition);
      if (current) setActive(navItems[current.index].href.replace('#', ''));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="relative text-lg font-semibold tracking-wide text-white">
          <span className="absolute -bottom-2 left-0 h-0.5 w-10 rounded-full bg-purple/30 blur-xl" />
          Aryan Qureshi
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-sm transition duration-300 ${
                  isActive ? 'text-purple' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-purple transition-all duration-300 ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition duration-300 hover:border-purple/40 hover:bg-purple/10 hover:text-white"
          >
            GitHub
          </a>
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition hover:border-purple/40 hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-2xl">{isOpen ? '×' : '≡'}</span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/10 bg-ink/95 px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-200 transition hover:text-purple"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-200 transition hover:text-purple"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
