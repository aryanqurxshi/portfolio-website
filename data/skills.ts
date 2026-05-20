export interface SkillItem {
  name: string;
  icon: string; // react-icons import name from 'react-icons/si'
  level: number; // 1–10
  category: 'lang' | 'framework' | 'tool';
}

// Levels based solely on evidence in projects/experience data.
// EmotiCare: Next.js 16, React 19, Tailwind CSS 4, MongoDB Atlas, face-api.js, Vercel
// The Logistics Alliance: Microsoft Excel, TC Software
export const skills: SkillItem[] = [
  { name: 'TypeScript', icon: 'SiTypescript',   level: 8, category: 'lang'      },
  { name: 'React',      icon: 'SiReact',         level: 8, category: 'framework' },
  { name: 'Next.js',    icon: 'SiNextdotjs',     level: 7, category: 'framework' },
  { name: 'Tailwind',   icon: 'SiTailwindcss',   level: 7, category: 'framework' },
  { name: 'MongoDB',    icon: 'SiMongodb',       level: 6, category: 'tool'      },
  { name: 'Vercel',     icon: 'SiVercel',        level: 6, category: 'tool'      },
  { name: 'Git',        icon: 'SiGit',           level: 7, category: 'tool'      },
];
