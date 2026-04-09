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
    <div className="group rounded-[2rem] border border-white/10 bg-black/60 p-8 shadow-soft transition hover:border-purple/40 hover:bg-surface/90">
      <p className="text-sm uppercase tracking-[0.28em] text-purple/80">Professional network</p>
      <h3 className="mt-4 text-3xl font-semibold text-white">{profile.headline}</h3>
      <p className="mt-5 text-sm leading-7 text-gray-300">{profile.summary}</p>
      <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 group-hover:border-purple/30 group-hover:bg-purple/5">
        <p className="text-sm font-semibold text-white">{profile.callToAction}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-purple/30 bg-purple/10 px-4 py-2 text-sm text-purple transition hover:bg-purple/15"
          >
            View LinkedIn
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:border-purple/40 hover:text-white"
          >
            Email me
          </a>
        </div>
      </div>
    </div>
  );
}
