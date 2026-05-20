'use client';

import { useEffect, useState } from 'react';
import { Navbar }              from '../components/Navbar';
import { HeroSection }         from '../components/HeroSection';
import { QuestsSection }       from '../components/sections/QuestsSection';
import { InventorySection }    from '../components/sections/InventorySection';
import { TrophiesSection }     from '../components/sections/TrophiesSection';
import { SkillsSection }       from '../components/sections/SkillsSection';
import { BonusLevelSection }   from '../components/sections/BonusLevelSection';
import { ContactSection }      from '../components/sections/ContactSection';
import { Footer }              from '../components/Footer';
import { BootSequence }        from '../components/BootSequence';
import { FpsCounter }          from '../components/FpsCounter';
import { EasterEggs }          from '../components/EasterEggs';

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.documentElement.classList.toggle('theme-dark',  theme === 'dark');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <>
      <BootSequence />
      <FpsCounter />
      <EasterEggs />

      <main className="relative overflow-x-hidden">
        <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

        {/* Hero gradient bloom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-hero opacity-80 blur-3xl" />

        <div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0">
          <HeroSection />
          <QuestsSection />
          <InventorySection />
          <TrophiesSection />
          <SkillsSection />
          <BonusLevelSection />
          <ContactSection />
        </div>

        <Footer />
      </main>
    </>
  );
}
