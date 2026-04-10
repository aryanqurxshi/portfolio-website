'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ExperienceItem } from '../data/experience';
import { Tag } from './Tag';

interface ExperienceDetailModalProps {
  item: ExperienceItem | null;
  onClose: () => void;
}

export function ExperienceDetailModal({ item, onClose }: ExperienceDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-modal-title"
          aria-describedby="experience-modal-description"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto relative w-full max-w-3xl flex flex-col max-h-[85vh] rounded-[2rem] border-2 border-retro bg-retro-panel text-retro shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_20px_60px_rgba(124,58,237,0.15)]"
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-retro/50 bg-gradient-to-r from-black/60 via-black/40 to-black/60 px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-purple/70">{item.company}</p>
              <h2 id="experience-modal-title" className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-retro">
                {item.title}
              </h2>
              <p className="mt-2 text-xs text-retro/70 uppercase tracking-wide">{item.location} · {item.range}</p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-retro/40 bg-retro-surface text-lg text-retro transition hover:border-purple/60 hover:bg-purple/15 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:ring-offset-1 focus:ring-offset-black"
              aria-label="Close experience details"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-retro bg-retro-surface p-4 sm:p-6 shadow-sm">
                <h3 className="text-sm sm:text-xl font-semibold text-retro sm:text-2xl">Overview</h3>
                <p id="experience-modal-description" className="mt-3 text-xs sm:text-base leading-6 sm:leading-8 text-retro/80 lg:text-lg">
                  {item.summary}
                </p>
              </div>

              {item.whatIDid?.length ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-purple/70">What I did</p>
                    <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-retro">Primary contribution</h3>
                  </div>
                  <ul className="space-y-3 text-base leading-8 text-retro/80">
                    {item.whatIDid.map((entry) => (
                      <li key={entry} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple flex-shrink-0" />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {item.howIDid?.length ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-purple/70">How I did it</p>
                    <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-retro">Approach</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-base leading-6 sm:leading-8 text-retro/80">
                    {item.howIDid.map((entry) => (
                      <li key={entry} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple flex-shrink-0" />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {item.skillsLearned?.length ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-purple/70">Skills learned</p>
                    <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-retro">New capabilities</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.skillsLearned.map((skill) => (
                      <Tag key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              ) : null}

              {item.technologies?.length ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-purple/70">Technologies</p>
                    <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-retro">Tools used</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Tag key={tech} label={tech} />
                    ))}
                  </div>
                </div>
              ) : null}

              {item.achievements?.length ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-purple/70">Achievements</p>
                    <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-retro">Results & impact</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-base leading-6 sm:leading-8 text-retro/80">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {item.links && (item.links.website || item.links.instagram) ? (
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-purple/70">Links</p>
                    <h3 className="mt-2 text-xl font-semibold text-retro">Quick access</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {item.links.website ? (
                      <a
                        href={item.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-purple/30 bg-purple/10 px-4 py-2 text-base text-purple transition hover:bg-purple/15"
                      >
                        Website
                      </a>
                    ) : null}
                    {item.links.instagram ? (
                      <a
                        href={item.links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-base text-retro transition hover:border-purple/40 hover:text-white"
                      >
                        Instagram
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
