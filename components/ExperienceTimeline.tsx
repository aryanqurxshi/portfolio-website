'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExperienceItem } from '../data/experience';
import { ExperienceDetailModal } from './ExperienceDetailModal';

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  const handleOpen = (item: ExperienceItem) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08, type: 'spring', bounce: 0.13 }}
            className="group relative cursor-pointer overflow-hidden rpg-card p-7 transition duration-300 hover:border-purple/40 hover:bg-purple/10 focus:outline-none focus:ring-2 focus:ring-purple/50"
            role="button"
            tabIndex={0}
            onClick={() => handleOpen(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleOpen(item);
              }
            }}
          >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-purple/70 via-purple/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-purple/80">{item.company}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.location} · {item.range}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  View details
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-gray-300 line-clamp-3">{item.summary}</p>
          </motion.article>
        ))}
      </div>
      <ExperienceDetailModal item={selectedItem} onClose={handleClose} />
    </>
  );
}
