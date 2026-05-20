'use client';

import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { HiDocumentText } from 'react-icons/hi';
import { socials } from '../../data/socials';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="rpg-section-header">
      <h2 className="rpg-section-title">▼ {children}</h2>
      <div className="rpg-section-divider" />
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="rpg-section px-6 sm:px-8 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading>RECRUIT TO PARTY</SectionHeading>

        <div className="rpg-panel p-4 sm:p-6 space-y-6">
          <p className="text-purple/60 text-xs uppercase tracking-[0.28em]">
            ▶ PRESS START TO MESSAGE
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-7">
            Open to internships, co-ops, collaborations, and interesting problems.
            If you&apos;re building something cool — I&apos;m interested.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${socials.email}`}
              className="contact-link-card"
            >
              <MdEmail size={20} className="pixel-icon" />
              <div>
                <p className="contact-link-label">EMAIL</p>
                <p className="contact-link-value">{socials.email}</p>
              </div>
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-card"
            >
              <FaLinkedinIn size={18} className="pixel-icon" />
              <div>
                <p className="contact-link-label">LINKEDIN</p>
                <p className="contact-link-value">aryanqureshi</p>
              </div>
            </a>

            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-card"
            >
              <SiGithub size={18} className="pixel-icon" />
              <div>
                <p className="contact-link-label">GITHUB</p>
                <p className="contact-link-value">aryanqurxshi</p>
              </div>
            </a>

            <a
              href={socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-card"
            >
              <HiDocumentText size={20} className="pixel-icon" />
              <div>
                <p className="contact-link-label">RESUME</p>
                <p className="contact-link-value">resume.pdf</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
