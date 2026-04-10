import { socials } from '../data/socials';

export function Footer() {
  return (
    <footer className="border-t border-retro bg-retro-panel px-6 py-10 text-gray-400 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-retro">Aryan Qureshi</p>
          <p className="mt-2 text-sm text-gray-400">Electrical Engineering Student @ University of Ottawa</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="rpg-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
          >
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rpg-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10 pt-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Aryan Qureshi.</p>
      </div>
    </footer>
  );
}
