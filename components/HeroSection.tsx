'use client';

import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { socials } from '../data/socials';

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/80 px-6 py-14 shadow-soft backdrop-blur-2xl sm:px-10 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-transparent opacity-80" />
      <div className="absolute inset-y-1/2 left-0 hidden h-[1px] w-full bg-white/5 sm:block" />
      <div className="absolute right-10 top-8 hidden h-28 w-28 rounded-full bg-purple/10 blur-3xl lg:block" />
      <div className="absolute left-6 bottom-10 hidden h-24 w-24 rounded-full bg-white/5 opacity-40 blur-3xl lg:block" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.46em] text-purple/80">Hello, I’m Aryan Qureshi</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {profile.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">{profile.intro}</p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="mt-8 max-w-2xl rounded-3xl border border-purple/20 bg-white/5 px-5 py-4 text-sm text-gray-200 shadow-glow"
          >
            {profile.highlight}
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              href={`#${profile.cta.projects}`}
              className="inline-flex items-center justify-center rounded-full bg-purple px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-purple/90"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              href={`#${profile.cta.caseStudies}`}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200 transition duration-300 hover:border-purple/40 hover:text-white"
            >
              Read Case Studies
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              href={`#${profile.cta.contact}`}
              className="inline-flex items-center justify-center rounded-full border border-purple/60 px-5 py-3 text-sm text-purple transition duration-300 hover:bg-purple/10"
            >
              Contact Me
            </motion.a>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ x: 4 }}
              className="text-sm text-gray-300 transition hover:text-white"
              href={socials.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </motion.a>
            <motion.a
              whileHover={{ x: 4 }}
              className="text-sm text-gray-300 transition hover:text-white"
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
