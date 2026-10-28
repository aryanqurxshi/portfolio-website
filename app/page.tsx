import { Hero } from '@/components/Hero';
import { StickyHeader } from '@/components/StickyHeader';
import { WorkSection } from '@/components/WorkSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AwardsSection, EducationSection } from '@/components/AwardsEducation';
import { SocialIcons } from '@/components/SocialIcons';
import { profile } from '@/data/profile';

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
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
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-divider py-10 text-sm text-meta">
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
