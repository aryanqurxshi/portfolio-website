import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { profile } from '@/data/profile';

export function SocialIcons({ className = '' }: { className?: string }) {
  const links = [
    { href: `mailto:${profile.email}`, label: 'Email', Icon: HiOutlineMail },
    { href: profile.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
    { href: profile.github, label: 'GitHub', Icon: FaGithub },
  ];
  return (
    <div className={`items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="opacity-70 transition-opacity hover:opacity-100"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
