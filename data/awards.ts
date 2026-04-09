export interface AwardItem {
  title: string;
  organization: string;
  project: string;
  category: string;
  date: string;
  location: string;
  summary: string;
  description: string;
  images: string[];
}

export const awards: AwardItem[] = [
  {
    title: 'CEED Design Day Winner',
    organization: 'University of Ottawa',
    project: 'EmotiCare',
    category: 'Childcare Monitoring Systems',
    date: '',
    location: '',
    summary:
      'Awarded for winning CEED Design Day at the University of Ottawa for EmotiCare, a childcare monitoring system focused on improving child safety, caregiver awareness, and peace of mind for families.',
    description:
      'Our team was recognized for developing a user-centered, impactful solution that combined thoughtful design, innovation, and practical engineering to address a real-world challenge in childcare.',
    images: [],
  },
];
