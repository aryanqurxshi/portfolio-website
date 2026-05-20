'use client';

import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { HiDocumentText } from 'react-icons/hi';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { GlitchName } from './GlitchName';
import { PixelPortrait } from './PixelPortrait';

const ANCHOR_ITEMS = [
  { label: 'QUESTS',      href: '#quests'    },
  { label: 'INVENTORY',   href: '#inventory' },
  { label: 'TROPHIES',    href: '#trophies'  },
  { label: 'SKILLS',      href: '#skills'    },
  { label: 'BONUS LEVEL', href: '#bonus'     },
  { label: 'CONTACT',     href: '#contact'   },
] as const;

export function HeroSection() {
  return (
    <section id="status" className="relative px-6 sm:px-8 py-12 sm:py-16 scroll-mt-16">
      {/* Decorative background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-transparent opacity-80" />
      <div className="pointer-events-none absolute left-6 top-10 h-24 w-24 rounded-full border border-purple/15 blur-2xl opacity-80" />
      <div className="pointer-events-none absolute right-10 top-24 h-28 w-28 rounded-full border border-purple/10 opacity-60" />
      <div className="pointer-events-none absolute left-0 bottom-8 h-16 w-16 rounded-full bg-purple/10 blur-sm opacity-90" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-20 w-20 rounded-full bg-white/5 blur-sm" />

      <div className="relative grid gap-8 grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        {/* ── Left: Character Portrait ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="rpg-panel-soft p-4 sm:p-6">
            <p className="text-xs sm:text-sm uppercase tracking-[0.46em] text-purple/80">Character Portrait</p>
            <div className="rpg-status-bar" />
            <div className="relative mt-6 flex flex-col items-center gap-6">
              <div className="hero-portrait-hud absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-purple/80 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm">
                <span>Level 18</span>
                <span className="h-2 w-2 rounded-full bg-purple" />
                <span>HP 128 / 128</span>
              </div>
              <PixelPortrait />
              <div className="rounded-[1.75rem] border border-retro bg-retro-surface px-4 sm:px-5 py-3 sm:py-4 text-center">
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-purple/80">Player</p>
                <p className="mt-2 text-lg sm:text-xl font-semibold text-retro">Aryan Qureshi</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Character Profile ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rpg-panel p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          {/* Name + title */}
          <div className="border-b border-retro pb-4 sm:pb-5">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-purple/80">Character Profile</p>
            {/* SACRED — typewriter glitch lives inside GlitchName, do not change */}
            <GlitchName
              name={profile.name}
              className="retro-heading mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.08em] text-retro"
            />
            <p className="mt-3 text-xs sm:text-base uppercase tracking-[0.28em] text-purple/80 sm:text-lg">{profile.title}</p>
          </div>

          {/* Location + school */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-retro bg-retro-surface p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-purple/80">Location</p>
              <p className="mt-1.5 text-base sm:text-lg font-semibold text-retro">Ottawa, Canada</p>
            </div>
            <div className="rounded-[1.75rem] border border-retro bg-retro-surface p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-purple/80">School</p>
              <p className="mt-1.5 text-base sm:text-lg font-semibold text-retro">University of Ottawa</p>
            </div>
          </div>

          {/* About + bio */}
          <div className="rounded-[1.75rem] border border-retro bg-retro-surface p-4 sm:p-5 space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-purple/80">About</p>
            <p className="text-sm sm:text-base leading-7 text-gray-300">
              Passionate about building innovative tech — especially applying engineering and AI to solve real-world problems and create impactful products.
            </p>
          </div>

          {/* Contact icons line */}
          <div className="hero-contact-line">
            <a href={`mailto:${socials.email}`} className="hero-contact-link" aria-label="Email">
              <MdEmail className="pixel-icon" size={16} />
              <span>email</span>
            </a>
            <span className="text-purple/30 hidden sm:inline">·</span>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hero-contact-link" aria-label="GitHub">
              <SiGithub className="pixel-icon" size={14} />
              <span>GitHub</span>
            </a>
            <span className="text-purple/30 hidden sm:inline">·</span>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hero-contact-link" aria-label="LinkedIn">
              <FaLinkedinIn className="pixel-icon" size={14} />
              <span>LinkedIn</span>
            </a>
            <span className="text-purple/30 hidden sm:inline">·</span>
            <a href={socials.resume} target="_blank" rel="noopener noreferrer" className="hero-contact-link" aria-label="Resume PDF">
              <HiDocumentText className="pixel-icon" size={16} />
              <span>resume.pdf</span>
            </a>
          </div>

          {/* Horizontal anchor nav */}
          <nav aria-label="Page sections" className="anchor-nav pt-2 border-t border-retro/40">
            {ANCHOR_ITEMS.map(({ label, href }) => (
              <a key={href} href={href} className="anchor-nav-item">
                {label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
