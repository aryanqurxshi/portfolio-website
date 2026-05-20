'use client';

import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiMongodb, SiVercel, SiGit,
} from 'react-icons/si';
import { skills } from '../../data/skills';

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const ICON_MAP: Record<string, IconComponent> = {
  SiTypescript:  SiTypescript,
  SiReact:       SiReact,
  SiNextdotjs:   SiNextdotjs,
  SiTailwindcss: SiTailwindcss,
  SiMongodb:     SiMongodb,
  SiVercel:      SiVercel,
  SiGit:         SiGit,
};

const TOTAL_SEGMENTS = 10;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="rpg-section-header">
      <h2 className="rpg-section-title">▼ {children}</h2>
      <div className="rpg-section-divider" />
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="rpg-section px-6 sm:px-8 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading>SKILLS</SectionHeading>

        <div className="rpg-panel p-4 sm:p-6">
          <div className="space-y-0 divide-y divide-retro/20">
            {skills.map((skill) => {
              const Icon = ICON_MAP[skill.icon];
              const filled = skill.level;
              const empty = TOTAL_SEGMENTS - filled;
              const bar = '▓'.repeat(filled) + '░'.repeat(empty);

              return (
                <div key={skill.name} className="skill-row">
                  {Icon && (
                    <Icon size={18} className="pixel-icon flex-shrink-0 text-purple/80" />
                  )}
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-bar-text" aria-label={`Level ${skill.level} out of 10`}>
                    {bar}
                  </span>
                  <span className="skill-level">LV.{skill.level}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
