import { Hero } from '@/components/Hero';
import { StickyHeader } from '@/components/StickyHeader';
import { Sidebar } from '@/components/Sidebar';
import { WorkSection } from '@/components/WorkSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AwardsSection, EducationSection } from '@/components/AwardsEducation';
import { SocialIcons } from '@/components/SocialIcons';
import { CommandPalette } from '@/components/CommandPalette';
import { Buddy } from '@/components/Buddy';
import { ArcadeGame } from '@/components/ArcadeGame';
import { GameLayer } from '@/components/GameLayer';
import { GameToggle } from '@/components/GameToggle';
import { profile } from '@/data/profile';

export default function Home() {
  return (
    <div className="min-h-screen lg:pl-56">
      <Sidebar />
      <StickyHeader />
      <Buddy />
      <ArcadeGame />
      <GameToggle variant="corner" className="fixed right-5 top-5 z-[46] hidden lg:flex" />
      <CommandPalette />
      <GameLayer />

      <main className="relative mx-auto max-w-page px-6">
        <Hero />
        <hr className="border-t border-divider" />
        <WorkSection />
        <hr className="border-t border-divider" />
        <ProjectsSection />
        <hr className="border-t border-divider" />
        <AwardsSection />
        <hr className="border-t border-divider" />
        <EducationSection />
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-divider py-10 pb-32 text-sm text-meta sm:pb-40">
          <p>
            © {new Date().getFullYear()} {profile.name} ·{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-2 hover:text-foreground">
              {profile.email}
            </a>
          </p>
          <SocialIcons className="flex" />
        </footer>
      </main>
    </div>
  );
}
