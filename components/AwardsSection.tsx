'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { AwardItem } from '../data/awards';

interface AwardsSectionProps {
  items: AwardItem[];
}

export function AwardsSection({ items }: AwardsSectionProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-black/60 p-10 shadow-soft text-center text-sm text-gray-400">
        Awards will appear here once they are added.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((award, index) => (
        <motion.article
          key={`${award.title}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.06, type: 'spring', bounce: 0.14 }}
          className="group rounded-[2rem] border border-white/10 bg-black/60 p-7 shadow-soft transition hover:border-purple/40 hover:bg-surface/90"
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-purple/70 via-purple/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-purple/80">{award.organization}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{award.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{award.category} · {award.date}</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-gray-300">{award.summary}</p>
          <p className="mt-6 text-sm leading-7 text-gray-300">{award.description}</p>
          {award.images.length > 0 && (
            <div className={`mt-6 grid gap-4 ${award.images.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}>
              {award.images.map((src) => (
                <div key={src} className="relative overflow-hidden rounded-[1.75rem] bg-white/5">
                  <Image
                    src={src}
                    alt={`${award.title} image`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 320px, 100vw"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}
