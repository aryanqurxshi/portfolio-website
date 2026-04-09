import { socials } from '../data/socials';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Awards', href: '#awards' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'GitHub', href: '#github' },
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink/95 px-6 py-10 text-gray-400 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-white">Aryan Qureshi</p>
          <p className="mt-2 text-sm text-gray-400">Electrical Engineering Student @ University of Ottawa</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href={socials.github} target="_blank" rel="noreferrer" className="text-sm transition hover:text-white">
              GitHub
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-sm transition hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10 pt-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Aryan Qureshi.</p>
      </div>
    </footer>
  );
}
