'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { RPGPanel } from '../components/RPGPanel';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { EducationSection } from '../components/EducationSection';
import { AwardsSection } from '../components/AwardsSection';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { GitHubSection } from '../components/GitHubSection';
import { LinkedInSection } from '../components/LinkedInSection';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { experience } from '../data/experience';
import { education } from '../data/education';
import { awards } from '../data/awards';
import { projects } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { githubProfile } from '../data/github';
import { linkedinProfile } from '../data/linkedin';

const menuItems = [
  {
    key: 'experience',
    label: 'Experience',
    description: 'Career story & battle-tested skills',
    icon: '⚔️',
  },
  {
    key: 'projects',
    label: 'Projects',
    description: 'Playable product builds with pixel frames',
    icon: '🧩',
  },
  {
    key: 'caseStudies',
    label: 'Case Studies',
    description: 'In-depth design decisions and outcomes',
    icon: '📜',
  },
  {
    key: 'education',
    label: 'Education',
    description: 'Training, coursework, and technical growth',
    icon: '🎓',
  },
  {
    key: 'awards',
    label: 'Awards',
    description: 'Achievements and honors unlocked',
    icon: '🏆',
  },
  {
    key: 'github',
    label: 'GitHub',
    description: 'Tools, repos, and side quests',
    icon: '💾',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    description: 'Professional network and account details',
    icon: '📝',
  },
  {
    key: 'contact',
    label: 'Contact',
    description: 'Reach out with a mission or collaboration request',
    icon: '✉️',
  },
] as const;

type PanelKey = (typeof menuItems)[number]['key'];

const panelMetadata: Record<PanelKey, { title: string; subtitle: string }> = {
  experience: {
    title: 'Experience',
    subtitle: 'Explore my career journey, selected roles, and what I built.',
  },
  projects: {
    title: 'Projects',
    subtitle: 'A retro panel of code, product work, and UX experiments.',
  },
  caseStudies: {
    title: 'Case Studies',
    subtitle: 'Deeper stories of strategy, execution, and outcomes.',
  },
  education: {
    title: 'Education',
    subtitle: 'My academic path and the knowledge I leveled up.',
  },
  awards: {
    title: 'Awards',
    subtitle: 'Milestones, recognition, and portfolio achievements.',
  },
  github: {
    title: 'GitHub',
    subtitle: 'Repositories, tools, and open-source contributions.',
  },
  linkedin: {
    title: 'LinkedIn',
    subtitle: 'Professional networking, experience, and contact methods.',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Send a message or connect through email and socials.',
  },
};

export default function HomePage() {
  const [openPanel, setOpenPanel] = useState<PanelKey | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const renderPanelContent = () => {
    switch (openPanel) {
      case 'experience':
        return <ExperienceTimeline items={experience} />;
      case 'education':
        return <EducationSection items={education} />;
      case 'awards':
        return <AwardsSection items={awards} />;
      case 'projects':
        return <ProjectsGrid items={projects} />;
      case 'caseStudies':
        return <CaseStudiesSection items={caseStudies} />;
      case 'github':
        return <GitHubSection profile={githubProfile} />;
      case 'linkedin':
        return <LinkedInSection profile={linkedinProfile} />;
      case 'contact':
        return <ContactForm />;
      default:
        return null;
    }
  };

  return (
    <main className="relative overflow-x-hidden">
      <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-hero opacity-80 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-24 lg:px-8">
        <HeroSection
          menuOptions={menuItems}
          onSelect={(key) => setOpenPanel(key as PanelKey)}
          isPanelOpen={Boolean(openPanel)}
          onClosePanel={() => setOpenPanel(null)}
        />
        <AnimatePresence>
          {openPanel ? (
            <RPGPanel
              title={panelMetadata[openPanel].title}
              subtitle={panelMetadata[openPanel].subtitle}
              isOpen={Boolean(openPanel)}
              onClose={() => setOpenPanel(null)}
            >
              {renderPanelContent()}
            </RPGPanel>
          ) : null}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}
