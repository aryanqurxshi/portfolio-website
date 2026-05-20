import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { socials } from '../data/socials';

const CREDITS =
  'LEAD DEVELOPER: ARYAN QURESHI  ·  MUSIC: SILENCE.WAV  ·  SPECIAL THANKS: COFFEE, STACK OVERFLOW  ·  © ' +
  new Date().getFullYear() +
  '  ·  NO PIXELS WERE HARMED IN THE MAKING OF THIS SITE  ·  ';

export function Footer() {
  return (
    <footer className="border-t border-retro bg-retro-panel px-4 sm:px-6 lg:px-8">
      {/* Credits scroll */}
      <div className="credits-track py-2 border-b border-retro/20">
        <span className="credits-content" aria-hidden="true">
          {CREDITS}{CREDITS}
        </span>
      </div>

      {/* Main footer row */}
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between py-8 sm:py-10 text-gray-400">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] sm:tracking-[0.34em] text-retro">
            Aryan Qureshi
          </p>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Electrical Engineering Student @ University of Ottawa
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="rpg-secondary-button text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
          >
            <SiGithub size={14} className="pixel-icon" />
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rpg-secondary-button text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
          >
            <FaLinkedinIn size={13} className="pixel-icon" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-xs sm:text-sm text-gray-500 text-center">
        <p>© {new Date().getFullYear()} Aryan Qureshi.</p>
      </div>
    </footer>
  );
}
