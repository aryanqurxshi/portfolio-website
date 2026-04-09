'use client';

import { motion } from 'framer-motion';
import type { GitHubRepo } from '../data/github';

interface GitHubSectionProps {
  profile: {
    username: string;
    url: string;
    summary: string;
    repositories: GitHubRepo[];
  };
}

export function GitHubSection({ profile }: GitHubSectionProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-purple/80">GitHub profile</p>
          <h3 className="mt-4 text-3xl font-semibold text-white">{profile.username}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300">{profile.summary}</p>
        </div>
        <a
          href={profile.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-purple/30 bg-purple/10 px-5 py-3 text-sm text-purple transition hover:bg-purple/15"
        >
          View profile
        </a>
      </div>
      <div className="mt-10 grid gap-4">
        {profile.repositories.map((repo, index) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05, type: 'spring', bounce: 0.14 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-purple/40 hover:bg-white/10"
          >
            <div className="pointer-events-none absolute -top-6 right-0 h-24 w-24 rounded-full bg-purple/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg font-semibold text-white">{repo.name}</h4>
              <span className="rounded-full bg-purple/10 px-3 py-1 text-xs text-purple">{repo.language}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-gray-300">{repo.description}</p>
            <p className="mt-5 text-sm text-gray-400">★ {repo.stars} stars</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
