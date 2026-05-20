'use client';

import { SiGithub, SiNextdotjs, SiReact, SiTailwindcss, SiMongodb, SiVercel } from 'react-icons/si';
import { projects } from '../../data/projects';

type IconKey = 'Next.js 16' | 'React 19' | 'Tailwind CSS 4' | 'MongoDB Atlas' | 'Vercel';

const STACK_ICONS: Record<string, React.ReactElement> = {
  'Next.js 16':     <SiNextdotjs  size={14} className="pixel-icon" title="Next.js"    />,
  'React 19':       <SiReact      size={14} className="pixel-icon" title="React"      />,
  'Tailwind CSS 4': <SiTailwindcss size={14} className="pixel-icon" title="Tailwind"  />,
  'MongoDB Atlas':  <SiMongodb    size={14} className="pixel-icon" title="MongoDB"    />,
  'Vercel':         <SiVercel     size={14} className="pixel-icon" title="Vercel"     />,
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="rpg-section-header">
      <h2 className="rpg-section-title">▼ {children}</h2>
      <div className="rpg-section-divider" />
    </div>
  );
}

export function InventorySection() {
  return (
    <section id="inventory" className="rpg-section px-6 sm:px-8 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading>INVENTORY</SectionHeading>

        <div className="rpg-panel p-4 sm:p-6 space-y-0 divide-y divide-retro/30">
          {projects.map((project) => (
            <div key={project.title} className="quest-entry">
              {/* Title + links row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inventory-title"
                >
                  <SiGithub size={13} className="pixel-icon inline mr-1.5 opacity-70" />
                  {project.title}
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inventory-action"
                  >
                    ▶ DEMO
                  </a>
                )}
              </div>

              {/* Stack icons */}
              <div className="inventory-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="inventory-tech-badge" title={tech}>
                    {STACK_ICONS[tech] ?? null}
                    <span>{tech.replace(/ \d+$/, '')}</span>
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="quest-summary">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
