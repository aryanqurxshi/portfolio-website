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
          className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/95 shadow-soft"
        >
          <div className="absolute right-4 top-4 z-10">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple/40 hover:bg-purple/10 focus:outline-none focus:ring-2 focus:ring-purple/50"
              aria-label="Close experience details"
            >
              ×
            </button>
          </div>
          <div className="max-h-[85vh] overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="space-y-8">
              <div className="space-y-3 border-b border-white/10 pb-6">
                <p className="text-xs uppercase tracking-[0.32em] text-purple/60">{item.company}</p>
                <div className="space-y-2 sm:space-y-0 sm:flex sm:items-end sm:justify-between sm:gap-4">
                  <div>
                    <h2 id="experience-modal-title" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-300 sm:max-w-2xl">
                      {item.location} · {item.range}
                    </p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gray-300">
                    Experience details
                  </div>
                </div>
              </div>

              <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-sm">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Overview</h3>
                  <p id="experience-modal-description" className="text-sm leading-7 text-gray-200">
                    {item.summary}
                  </p>
                </div>

                <div className="space-y-6 divide-y divide-white/10">
                  {item.whatIDid?.length ? (
                    <section className="space-y-4 py-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.32em] text-purple/70">What I did</p>
                          <h3 className="mt-2 text-xl font-semibold text-white">Primary contribution</h3>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-gray-300">
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
                          <p className="text-xs uppercase tracking-[0.32em] text-purple/70">How I did it</p>
                          <h3 className="mt-2 text-xl font-semibold text-white">Approach</h3>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-gray-300">
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
                        <p className="text-xs uppercase tracking-[0.32em] text-purple/70">Skills learned</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">New capabilities</h3>
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
                        <p className="text-xs uppercase tracking-[0.32em] text-purple/70">Technologies</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">Tools used</h3>
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
                        <p className="text-xs uppercase tracking-[0.32em] text-purple/70">Achievements</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">Notable outcomes</h3>
                      </div>
                      <ul className="space-y-3 text-sm text-gray-300">
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
                      <h3 className="mt-2 text-xl font-semibold text-white">Quick access</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {item.links.website ? (
                        <a
                          href={item.links.website}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-purple/30 bg-purple/10 px-4 py-2 text-sm text-purple transition hover:bg-purple/15"
                        >
                          Website
                        </a>
                      ) : null}
                      {item.links.instagram ? (
                        <a
                          href={item.links.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:border-purple/40 hover:text-white"
                        >
                          Instagram
                        </a>
                      ) : null}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
