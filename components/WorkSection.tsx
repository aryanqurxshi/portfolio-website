'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { experience, type ExperienceItem } from '@/data/experience';
import { Logo } from './Logo';

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 shrink-0 fill-current text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}

function Row({ item, defaultOpen }: { item: ExperienceItem; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="py-3">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-3 text-left"
      >
        <Logo src={item.logo} name={item.company} />
        <p className="min-w-0 flex-1">
          <span className="group-hover:underline decoration-tertiary underline-offset-4">{item.role}</span>
          <span className="text-sm text-secondary"> | {item.company}</span>
        </p>
        <span className="hidden shrink-0 whitespace-nowrap text-sm text-secondary sm:inline">{item.range}</span>
        <Chevron open={open} />
      </button>
      <p className="mt-0.5 pl-[52px] text-sm text-secondary sm:hidden">{item.range}</p>
      {item.summary && <p className="mt-2 pl-[52px] text-foreground/70">{item.summary}</p>}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-[52px] pt-3">
              <ul className="space-y-1.5 text-[15px] leading-relaxed text-foreground/70">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="select-none text-foreground/30" aria-hidden="true">
                      –
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="text-meta">{item.location}</span>
                {item.tags.map((t) => (
                  <span key={t} className="rounded-full bg-well px-2.5 py-0.5 text-xs text-foreground/70">
                    {t}
                  </span>
                ))}
                {item.project && (
                  <a href={`#project-${item.project}`} className="ml-auto font-medium hover:opacity-70">
                    See the project <span aria-hidden="true">→</span>
                  </a>
                )}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="ml-auto font-medium hover:opacity-70">
                    Visit <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="py-8" aria-labelledby="work-heading">
      <h2 id="work-heading" className="mb-5 text-3xl font-semibold tracking-tight">
        Work
      </h2>
      <div className="space-y-8">
        {experience.map((group, gi) => (
          <div key={group.label}>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-tertiary">{group.label}</h3>
            <ul>
              {group.items.map((item, i) => (
                <Row key={`${item.company}-${item.role}`} item={item} defaultOpen={gi === 0 && i === 0} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
