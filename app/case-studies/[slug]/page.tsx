import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '../../../data/caseStudies';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default function CaseStudyDetail({ params }: Props) {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) return notFound();

  return (
    <main className="bg-ink min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <Link href="/case-studies" className="text-sm text-purple transition hover:text-purple/70">
          ← Back to all case studies
        </Link>
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-surface/90 p-10 shadow-glow">
          <p className="text-sm uppercase tracking-[0.32em] text-purple/80">{study.theme}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{study.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">{study.summary}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Problem</p>
              <p className="mt-3 text-sm leading-7 text-gray-200">{study.problem}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Outcome</p>
              <p className="mt-3 text-sm leading-7 text-gray-200">{study.outcome}</p>
            </div>
          </div>
          <section className="mt-12 space-y-10">
            <div>
              <h2 className="text-xl font-semibold text-white">Approach</h2>
              <p className="mt-3 text-gray-300 leading-8">{study.approach}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Process</h2>
              <p className="mt-3 text-gray-300 leading-8">{study.process}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Challenges</h2>
              <p className="mt-3 text-gray-300 leading-8">{study.challenges}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Lessons Learned</h2>
              <p className="mt-3 text-gray-300 leading-8">{study.lessons}</p>
            </div>
          </section>
          <div className="mt-12 rounded-3xl border border-white/10 bg-black/50 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Tools & technologies</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {study.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
