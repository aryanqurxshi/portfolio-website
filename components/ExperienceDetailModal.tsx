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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-8"
        onPointerDown={(event) => {
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
          className="relative w-full max-w-3xl overflow-hidden rpg-panel"
        >
          <div className="absolute right-4 top-4 z-10">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-retro bg-retro-panel text-retro transition hover:border-purple/40 hover:bg-purple/10 focus:outline-none focus:ring-2 focus:ring-purple/50"
              aria-label="Close experience details"
            >
              ×
            </button>
          </div>
          <div className="max-h-[85vh] overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="space-y-8">
              <div className="space-y-3 border-b border-retro pb-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-purple/60">{item.company}</p>
                  <div className="space-y-2 sm:space-y-0 sm:flex sm:items-end sm:justify-between sm:gap-4">
                    <div>
                      <h2 id="experience-modal-title" className="retro-heading text-5xl font-semibold tracking-tight text-retro sm:text-6xl">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-retro/70 sm:max-w-2xl">
                        {item.location} · {item.range}
                      </p>
                    </div>
                </div>
              </div>

              <div className="space-y-6 rounded-[1.75rem] border border-retro bg-retro-surface p-6 shadow-sm">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-retro sm:text-2xl">Overview</h3>
                  <p id="experience-modal-description" className="text-base leading-8 text-retro/80 sm:text-lg">
                    {item.summary}
                  </p>
                </div>

                <div className="space-y-6 divide-y divide-white/10">
                  {item.whatIDid?.length ? (
                    <section className="space-y-4 py-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.32em] text-purple/70">What I did</p>
                          <h3 className="mt-2 text-2xl font-semibold text-retro">Primary contribution</h3>
                        </div>
                      </div>
                      <ul className="space-y-3 text-base leading-8 text-retro/80">
                        {item.whatIDid.map((entry) => (
                          <li key={entry} className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-purple" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {item.howIDid?.length ? (
                    <section className="space-y-4 py-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.32em] text-purple/70">How I did it</p>
                          <h3 className="mt-2 text-2xl font-semibold text-retro">Approach</h3>
                        </div>
                      </div>
                      <ul className="space-y-3 text-base leading-8 text-retro/80">
                        {item.howIDid.map((entry) => (
                          <li key={entry} className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-purple" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {item.skillsLearned?.length ? (
                    <section className="space-y-4 py-6">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-purple/70">Skills learned</p>
                        <h3 className="mt-2 text-2xl font-semibold text-retro">New capabilities</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.skillsLearned.map((skill) => (
                          <Tag key={skill} label={skill} />
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {item.technologies?.length ? (
                    <section className="space-y-4 py-6">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-purple/70">Technologies</p>
                        <h3 className="mt-2 text-2xl font-semibold text-retro">Tools used</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Tag key={tech} label={tech} />
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {item.achievements?.length ? (
                    <section className="space-y-4 py-6">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-purple/70">Achievements</p>
                        <h3 className="mt-2 text-2xl font-semibold text-retro">Notable outcomes</h3>
                      </div>
                      <ul className="space-y-3 text-base leading-8 text-retro/80">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="flex gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-purple" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>

                {item.links && (item.links.website || item.links.instagram) ? (
                  <section className="space-y-4 py-6">
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
                  </section>
                ) : null}
              </div>
              <div className="rpg-panel-corners">
                <div className="rpg-corner rpg-corner-tl" />
                <div className="rpg-corner rpg-corner-tr" />
                <div className="rpg-corner rpg-corner-bl" />
                <div className="rpg-corner rpg-corner-br" />
              </div>
              <div className="rpg-scanlines" />
              <div className="rpg-particles" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
