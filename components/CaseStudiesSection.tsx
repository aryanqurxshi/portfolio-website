'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CaseStudy } from '../data/caseStudies';
import { Tag } from './Tag';

interface CaseStudiesSectionProps {
  items: CaseStudy[];
}

export function CaseStudiesSection({ items }: CaseStudiesSectionProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {items.map((study, index) => (
        <motion.article
          key={study.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.6, delay: index * 0.06, type: 'spring', bounce: 0.12 }}
          className="group relative rounded-[2rem] border border-white/10 bg-black/60 p-4 sm:p-6 md:p-7 shadow-soft transition hover:border-purple/40 hover:bg-surface/90"
        >
          <div className="pointer-events-none absolute inset-x-4 sm:inset-x-6 top-0 h-[1px] bg-gradient-to-r from-purple/70 via-purple/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-purple/80">{study.theme}</p>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
          <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-white">{study.title}</h3>
          <p className="mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">{study.summary}</p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href={`/case-studies/${study.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple transition hover:text-purple/80"
            >
              Read case study →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
