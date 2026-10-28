'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects, type ProjectItem } from '@/data/projects';
import { Highlight } from './Highlight';

const HASH_PREFIX = '#project-';

function ProjectModal({
  project,
  onClose,
  onStep,
}: {
  project: ProjectItem;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onStep]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="pixel-frame relative max-h-[92vh] w-full max-w-[680px] overflow-y-auto rounded-t-2xl bg-background shadow-2xl sm:rounded-2xl"
        initial={{ y: 24, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 24, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-divider/60 bg-background/95 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-1 text-sm text-secondary">
            <button type="button" onClick={() => onStep(-1)} className="rounded px-2 py-1 hover:bg-well" aria-label="Previous project">
              ←
            </button>
            <button type="button" onClick={() => onStep(1)} className="rounded px-2 py-1 hover:bg-well" aria-label="Next project">
              →
            </button>
            <span className="ml-1 tabular-nums">
              {projects.findIndex((p) => p.slug === project.slug) + 1} / {projects.length}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded px-2 py-1 text-lg leading-none text-secondary hover:bg-well hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="bg-well">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            width={1360}
            height={765}
            className="aspect-video w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-5 px-5 pb-8 pt-5 sm:px-8">
          <div>
            <h3 id="project-modal-title" className="font-display text-4xl italic tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-foreground/70">{project.tagline}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-tertiary">{project.meta}</p>
          </div>

          <p className="leading-relaxed text-foreground/80">{project.overview}</p>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-tertiary">Highlights</h4>
            <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/80">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="select-none text-foreground/30" aria-hidden="true">
                    •
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.gallery && (
            <div className="grid gap-3 sm:grid-cols-2">
              {project.gallery.map((g) => (
                <a key={g.src} href={g.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg bg-well">
                  <Image src={g.src} alt={g.alt} width={680} height={453} className="w-full transition-transform duration-200 hover:scale-105" />
                </a>
              ))}
            </div>
          )}

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-tertiary">{project.stackLabel ?? 'Built with'}</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full bg-well px-2.5 py-1 text-xs text-foreground/80">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-70"
                >
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const project = projects.find((p) => p.slug === openSlug) ?? null;

  // Deep links (#project-alten) from the hero, Work rows, and Awards open the modal.
  useEffect(() => {
    const sync = () => {
      const { hash } = window.location;
      if (hash.startsWith(HASH_PREFIX)) {
        const slug = hash.slice(HASH_PREFIX.length);
        if (projects.some((p) => p.slug === slug)) setOpenSlug(slug);
      }
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const open = (slug: string) => {
    setOpenSlug(slug);
    history.replaceState(null, '', `${HASH_PREFIX}${slug}`);
  };

  const close = useCallback(() => {
    setOpenSlug(null);
    history.replaceState(null, '', '#projects');
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!openSlug) return;
      const i = projects.findIndex((p) => p.slug === openSlug);
      const next = projects[(i + dir + projects.length) % projects.length].slug;
      setOpenSlug(next);
      history.replaceState(null, '', `${HASH_PREFIX}${next}`);
    },
    [openSlug],
  );

  return (
    <section id="projects" className="py-8" aria-labelledby="projects-heading">
      <h2 id="projects-heading" data-game="INVENTORY" className="mb-5 text-3xl font-semibold tracking-tight">
        Projects
      </h2>
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.slug} id={`project-${p.slug}`} className="scroll-mt-24">
            <button type="button" aria-haspopup="dialog" onClick={() => open(p.slug)} className="group block w-full text-left">
              <span className="pixel-frame block overflow-hidden rounded-lg bg-well transition-transform game:group-hover:-translate-y-1">
                <Image
                  src={p.image}
                  alt=""
                  width={680}
                  height={383}
                  className="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </span>
              <span className="mt-2 block font-semibold">
                <Highlight tone={p.tone} className="-ml-1">{p.title}</Highlight>
              </span>
              <span className="block text-sm text-foreground/60">{p.tagline}</span>
            </button>
            <button
              type="button"
              onClick={() => open(p.slug)}
              className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium hover:opacity-70"
            >
              View details <span aria-hidden="true">→</span>
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {project && <ProjectModal key="modal" project={project} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
