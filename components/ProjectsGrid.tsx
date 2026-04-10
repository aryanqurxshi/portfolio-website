'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tag } from './Tag';
import type { ProjectItem } from '../data/projects';

interface ProjectsGridProps {
  items: ProjectItem[];
}

export function ProjectsGrid({ items }: ProjectsGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {items.map((project, index) => {
        const hasImage = Boolean(project.image);

        return (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.07, type: 'spring', bounce: 0.12 }}
            className={`group relative overflow-hidden rpg-card transition duration-300 ${
              project.featured ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="relative overflow-hidden rounded-[2rem] border border-retro bg-white/5 h-52 sm:h-64 lg:h-auto">
                {hasImage ? (
                  <>
                    <Image
                      src={project.image as string}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 800px, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="grid h-full place-items-center bg-white/5 text-gray-400">
                    <div className="space-y-2 text-center">
                      <div className="mx-auto h-12 w-12 rounded-full border border-white/10 bg-white/5" />
                      <p className="text-sm text-gray-300">Preview coming soon</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-purple/80">{project.featured ? 'Featured project' : 'Project'}</p>
                    <span className="rounded-full bg-white/5 px-2 sm:px-3 py-1 text-xs sm:text-sm text-retro whitespace-nowrap">{project.tags[0]}</span>
                  </div>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-retro">{project.title}</h3>
                </div>
                <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-retro">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rpg-button"
                >
                  Live demo
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="rpg-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
                >
                  Source code
                </motion.a>
              </div>
            </div>            </div>          </motion.article>
        );
      })}
    </div>
  );
}
