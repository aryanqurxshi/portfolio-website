export interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  tags: string[];
  featured: boolean;
  demo: string;
  repo: string;
  image?: string;
}

export const projects: ProjectItem[] = [
  {
    title: 'EmotiCare (Student Wellness Dashboard)',
    description:
      'EmotiCare is a child emotional wellness system. Kids step in front of a webcam throughout the day, the system detects their emotion using AI using face-api.js, and an educator dashboard shows real-time aggregate emotional state of the class, flagging kids who need immediate attention.',
    stack: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'MongoDB Atlas', 'face-api.js', 'Vercel'],
    tags: ['AI', 'Education', 'Wellness'],
    featured: true,
    demo: 'https://emoticare.ca',
    repo: 'https://github.com/aryanqurxshi/emoticare',
    image: '/projects/emoticare.jpeg',
  },
];
