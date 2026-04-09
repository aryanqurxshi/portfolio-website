import Link from 'next/link';
import { SectionHeading } from '../../components/SectionHeading';
import { caseStudies } from '../../data/caseStudies';

export default function CaseStudiesPage() {
  return (
    <main className="bg-ink min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <SectionHeading title="All Case Studies" subtitle="Explore every project story and learn how each solution came together." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group rounded-3xl border border-white/10 bg-surface/80 p-8 transition duration-300 hover:-translate-y-1 hover:border-purple/40 hover:bg-surface/95"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-purple/80">{study.theme}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-purple">{study.title}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-300">{study.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
