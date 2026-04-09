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
    <div className="grid gap-6 lg:grid-cols-2">
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
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 shadow-soft transition duration-300 ${
              project.featured ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="relative overflow-hidden rounded-t-[2rem] bg-white/5 aspect-[16/9]">
              {hasImage ? (
                <>
                  <Image
                    src={project.image as string}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 800px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-purple/80">{project.featured ? 'Featured project' : 'Project'}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">{project.tags[0]}</span>
              </div>
              <p className="mt-6 text-sm leading-7 text-gray-300">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-purple/30 bg-white/5 px-4 py-2 text-sm text-purple transition hover:bg-purple/10"
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
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:border-purple/40 hover:text-white"
                >
                  Source code
                </motion.a>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
