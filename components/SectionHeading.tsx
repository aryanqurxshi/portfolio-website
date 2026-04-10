'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mb-8 max-w-3xl"
    >
      <p className="text-base uppercase tracking-[0.28em] text-purple/80">{title}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="h-0.5 w-16 rounded-full bg-gradient-to-r from-purple to-transparent" />
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {subtitle ? (
        <p className="mt-4 text-base leading-8 text-gray-300 sm:text-lg">{subtitle}</p>
      ) : null}
      <div className="rpg-panel-corners">
        <div className="rpg-corner rpg-corner-tl" />
        <div className="rpg-corner rpg-corner-tr" />
        <div className="rpg-corner rpg-corner-bl" />
        <div className="rpg-corner rpg-corner-br" />
      </div>
      <div className="rpg-divider" />
      <div className="rpg-scanlines" />
      <div className="rpg-particles" />
      <div className="rpg-status-bar" />
    </motion.div>
  );
}
