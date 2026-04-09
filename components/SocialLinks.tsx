import { socials } from '../data/socials';

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <a href={socials.github} target="_blank" rel="noreferrer" className="text-sm text-gray-300 transition hover:text-white">
        GitHub
      </a>
      <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-sm text-gray-300 transition hover:text-white">
        LinkedIn
      </a>
      <a href={`mailto:${socials.email}`} className="text-sm text-gray-300 transition hover:text-white">
        Email
      </a>
    </div>
  );
}
