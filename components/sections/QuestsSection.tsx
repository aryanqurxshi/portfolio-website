'use client';

import Image from 'next/image';
import { SiInstagram } from 'react-icons/si';
import { experience } from '../../data/experience';
import { education } from '../../data/education';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="rpg-section-header">
      <h2 className="rpg-section-title">▼ {children}</h2>
      <div className="rpg-section-divider" />
    </div>
  );
}

export function QuestsSection() {
  return (
    <section id="quests" className="rpg-section px-6 sm:px-8 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading>QUESTS</SectionHeading>

        <div className="rpg-panel p-4 sm:p-6 space-y-0 divide-y divide-retro/30">
          {experience.map((item) => (
            <div key={item.company + item.range} className="quest-entry">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Company logo / icon */}
                  {item.company === 'Palace.to' && item.links?.instagram && (
                    <a
                      href={item.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-icon-link"
                      aria-label="Palace.to Instagram"
                    >
                      <SiInstagram size={14} className="pixel-icon text-purple/70" />
                    </a>
                  )}
                  <span className="quest-role">{item.title}</span>
                  <span className="quest-separator">·</span>
                  <span className="quest-company">{item.company}</span>
                </div>
                <span className="quest-range">{item.range}</span>
              </div>
              <p className="quest-summary">{item.summary}</p>
              {item.technologies && item.technologies.length > 0 && (
                <div className="quest-tags">
                  {item.technologies.map((t) => (
                    <span key={t} className="quest-tag">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Education folded under Quests */}
          {education.map((item) => (
            <div key={item.institution} className="quest-entry">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* uOttawa placeholder icon */}
                  <Image
                    src="/icons/uottawa.png"
                    alt="University of Ottawa"
                    width={16}
                    height={16}
                    className="pixel-icon opacity-60"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="quest-role">{item.program}</span>
                  <span className="quest-separator">·</span>
                  <span className="quest-company">{item.institution}</span>
                </div>
                <span className="quest-range">{item.dates}</span>
              </div>
              <p className="quest-summary">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
