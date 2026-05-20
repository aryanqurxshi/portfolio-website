'use client';

import { awards } from '../../data/awards';

const MEDALS = ['🥇', '🥈', '🥉', '🏅'];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="rpg-section-header">
      <h2 className="rpg-section-title">▼ {children}</h2>
      <div className="rpg-section-divider" />
    </div>
  );
}

export function TrophiesSection() {
  return (
    <section id="trophies" className="rpg-section px-6 sm:px-8 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading>TROPHIES</SectionHeading>

        <div className="rpg-panel p-4 sm:p-6 space-y-0 divide-y divide-retro/30">
          {awards.map((award, i) => (
            <div key={award.title} className="quest-entry">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl leading-none">{MEDALS[i] ?? '🏅'}</span>
                  <span className="quest-role">{award.title}</span>
                  <span className="quest-separator">·</span>
                  <span className="quest-company">{award.organization}</span>
                </div>
                <span className="quest-range">{award.date}</span>
              </div>
              <p className="quest-summary">{award.summary}</p>
              {award.project && (
                <div className="quest-tags">
                  <span className="quest-tag">📦 {award.project}</span>
                  {award.category && <span className="quest-tag">{award.category}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
