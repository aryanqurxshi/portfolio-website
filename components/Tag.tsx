'use client';

import { motion } from 'framer-motion';

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <motion.span
      layout
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
    >
      {label}
    </motion.span>
  );
}
