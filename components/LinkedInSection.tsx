import { socials } from '../data/socials';

interface LinkedInSectionProps {
  profile: {
    name: string;
    headline: string;
    summary: string;
    url: string;
    callToAction: string;
  };
}

export function LinkedInSection({ profile }: LinkedInSectionProps) {
  return (
    <div className="group rpg-card p-8 transition hover:border-purple/40 hover:bg-purple/10">
      <p className="text-sm uppercase tracking-[0.28em] text-purple/80">Professional network</p>
      <h3 className="mt-4 retro-heading text-3xl font-semibold text-retro">{profile.headline}</h3>
      <p className="mt-5 text-sm leading-7 text-gray-300">{profile.summary}</p>
      <div className="mt-6 space-y-4 rpg-panel-soft p-6 transition duration-300 group-hover:border-purple/30 group-hover:bg-purple/5">
        <p className="text-sm font-semibold text-white">{profile.callToAction}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.url}
            target="_blank"
            rel="noreferrer"
            className="rpg-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
          >
            View LinkedIn
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="rpg-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50"
          >
            Email me
          </a>
        </div>
      </div>
    </div>
  );
}
