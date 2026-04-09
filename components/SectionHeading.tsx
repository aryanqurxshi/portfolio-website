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
      <p className="text-sm uppercase tracking-[0.28em] text-purple/80">{title}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="h-0.5 w-16 rounded-full bg-gradient-to-r from-purple to-transparent" />
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      </div>
      {subtitle ? (
        <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
