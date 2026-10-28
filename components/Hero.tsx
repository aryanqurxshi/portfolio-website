import { navLinks, profile } from '@/data/profile';
import { Character } from './Character';
import { Highlight } from './Highlight';
import { HoverCard } from './HoverCard';
import { ThemeToggle } from './ThemeToggle';
import { TypingName } from './TypingName';
import { UOttawaMark } from './UOttawaMark';

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="select-none text-foreground/30" aria-hidden="true">
        •
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Hero() {
  return (
    <header className="py-10 sm:pt-16">
      <div className="flex items-end gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-display text-[2.75rem] italic leading-none tracking-tight sm:text-6xl">
              <TypingName text={profile.name} />
            </h1>
            <ThemeToggle className="sm:hidden" />
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-lg font-medium leading-relaxed">
              {profile.program} @{' '}
              <HoverCard caption="BASc · Sep 2025 – Jan 2030 · Ottawa, ON" href={profile.schoolUrl}>
                <span className="inline-flex items-baseline gap-1.5">
                  <UOttawaMark />
                  <span className="underline decoration-tertiary underline-offset-4">{profile.school}</span>
                </span>
              </HoverCard>
            </p>

            <ul className="space-y-2 leading-relaxed text-foreground/80">
              <Bullet>
                co-founder &amp; engineer at{' '}
                <HoverCard image="/projects/vaultq.jpg" caption="Resale inventory: iOS app + dashboard on one API" href="#project-vaultq">
                  <Highlight tone="blue" delay={0}>VaultQ</Highlight>
                </HoverCard>
                , pricing and cross-listing for sneaker resale
              </Bullet>
              <Bullet>
                built{' '}
                <HoverCard image="/projects/beacon.svg" caption="AGI Ventures Healthcare Hackathon · 24 hours" href="#project-beacon">
                  <Highlight tone="teal" delay={150}>Beacon</Highlight>
                </HoverCard>
                , an AI clinical copilot for Ontario doctors, in 24 hours
              </Bullet>
              <Bullet>
                built{' '}
                <HoverCard image="/projects/alten.jpg" caption="Points, speaks & protects" href="#project-alten">
                  <Highlight tone="green" delay={300}>Alten</Highlight>
                </HoverCard>
                , an AI buddy that helps seniors get things done online
              </Bullet>
              <Bullet>
                <HoverCard image="/projects/emoticare.jpeg" caption="EmotiCare · Winter 2026" href="#project-emoticare">
                  <Highlight tone="garnet" delay={450}>uOttawa Design Day winner</Highlight>
                </HoverCard>{' '}
                with EmotiCare, a classroom wellness dashboard
              </Bullet>
              <Bullet>
                scaled{' '}
                <HoverCard caption="Sourcing, pricing, inventory & Instagram marketing, end to end" href="https://www.instagram.com/palace.to/">
                  <Highlight tone="purple" delay={600}>Palace.to</Highlight>
                </HoverCard>{' '}
                to $80K+ in resale revenue
              </Bullet>
              <Bullet>
                seeking <Highlight delay={750}>internship opportunities</Highlight>!
              </Bullet>
            </ul>
          </div>
        </div>

        <Character className="mb-1 hidden h-[260px] sm:block" />
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="text-sm text-meta">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            LinkedIn
          </a>
          <span className="mx-1.5">|</span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            GitHub
          </a>
          <span className="mx-1.5">|</span>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
            Resume
          </a>
          <span className="mx-1.5">|</span>
          <a href={`mailto:${profile.email}`} className="underline underline-offset-2 hover:text-foreground">
            Let&apos;s Connect!
          </a>
        </p>
        <Character className="-mb-1 h-28 sm:hidden" bubble="left" />
      </div>

      <nav id="main-nav" className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-xl" aria-label="Main">
        {navLinks.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="hover:underline decoration-tertiary underline-offset-4">
            {l.label}
          </a>
        ))}
        <ThemeToggle className="ml-auto hidden self-center sm:inline-flex" />
      </nav>
    </header>
  );
}
