'use client';

import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SectionHeading } from '../components/SectionHeading';
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

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-hero opacity-80 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-6 lg:px-8">
        <HeroSection />
        <motion.section
          id="experience"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <SectionHeading title="Experience" />
          <ExperienceTimeline items={experience} />
        </motion.section>
        <motion.section
          id="education"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <SectionHeading title="Education" subtitle="My academic foundation and technical training." />
          <EducationSection items={education} />
        </motion.section>
        <motion.section
          id="awards"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <SectionHeading title="Awards" subtitle="Recognition and milestones from academic and professional achievements." />
          <AwardsSection items={awards} />
        </motion.section>
        <motion.section
          id="projects"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <SectionHeading title="Projects" />
          <ProjectsGrid items={projects} />
        </motion.section>
        <motion.section
          id="case-studies"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <SectionHeading title="Case Studies" subtitle="In-depth stories that describe my process, decisions, and outcomes." />
          <CaseStudiesSection items={caseStudies} />
        </motion.section>
        <div className="grid gap-12 xl:grid-cols-[1.2fr_0.8fr] xl:gap-10">
          <motion.section
            id="github"
            className="mt-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <SectionHeading title="GitHub" subtitle="A curated view of repositories, tools, and side projects." />
            <GitHubSection profile={githubProfile} />
          </motion.section>
          <motion.section
            id="linkedin"
            className="mt-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          >
            <SectionHeading title="LinkedIn" subtitle="Professional perspective and networking built for product leadership." />
            <LinkedInSection profile={linkedinProfile} />
          </motion.section>
        </div>
        <motion.section
          id="contact"
          className="mt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <SectionHeading title="Contact" subtitle="Send a message or connect through email, GitHub, or LinkedIn." />
          <ContactForm />
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
