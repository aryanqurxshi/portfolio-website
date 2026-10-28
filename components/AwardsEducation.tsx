import { awards, education } from '@/data/awards';
import { Logo } from './Logo';
import { UOttawaMark } from './UOttawaMark';

export function AwardsSection() {
  return (
    <section id="awards" className="py-8" aria-labelledby="awards-heading">
      <h2 id="awards-heading" className="mb-5 text-3xl font-semibold tracking-tight">
        Awards
      </h2>
      <ul className="divide-y divide-divider/60">
        {awards.map((a) => (
          <li key={`${a.event}-${a.project}`} className="flex items-baseline gap-3 py-3">
            <p className="min-w-0 flex-1">
              <span className="inline-flex items-baseline gap-1.5">
                <UOttawaMark />
                {a.event}
              </span>
              <span className="text-sm text-secondary">
                {' '}
                |{' '}
                {a.projectSlug ? (
                  <a href={`#project-${a.projectSlug}`} className="hover:text-foreground hover:underline decoration-tertiary underline-offset-2">
                    {a.project}
                  </a>
                ) : (
                  a.project
                )}
              </span>
            </p>
            <span data-tone="garnet" className="hl hl-on shrink-0 whitespace-nowrap px-1 text-sm font-medium">{a.result}</span>
            <span className="hidden shrink-0 whitespace-nowrap text-sm text-secondary sm:inline">{a.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="py-8" aria-labelledby="education-heading">
      <h2 id="education-heading" className="mb-5 text-3xl font-semibold tracking-tight">
        Education
      </h2>
      <ul>
        {education.map((e) => (
          <li key={e.school} className="py-3">
            <div className="flex items-center gap-3">
              <Logo src="/logos/uottawa.png" name={e.school} />
              <p className="min-w-0 flex-1">
                <span>{e.program}</span>
                <span className="text-sm text-secondary"> | {e.school}</span>
              </p>
              <span className="hidden shrink-0 whitespace-nowrap text-sm text-secondary sm:inline">{e.range}</span>
            </div>
            <p className="mt-0.5 pl-[52px] text-sm text-secondary sm:hidden">{e.range}</p>
            <p className="mt-2 pl-[52px] text-sm text-foreground/70">
              <span className="text-meta">Coursework: </span>
              {e.coursework.join(' · ')}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
