'use client';

import { motion } from 'framer-motion';
import type { EducationItem } from '../data/education';

interface EducationSectionProps {
  items: EducationItem[];
}

export function EducationSection({ items }: EducationSectionProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.article
          key={`${item.institution}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
          className="rounded-[2rem] border border-white/10 bg-black/60 p-4 sm:p-6 md:p-7 shadow-soft"
        >
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-purple/80">{item.institution}</p>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white">{item.program}</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">{item.location} · {item.dates}</p>
            </div>
          </div>
          <p className="mt-6 text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">{item.summary}</p>
          <ul className="mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-purple" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
