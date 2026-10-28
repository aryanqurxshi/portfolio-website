export interface AwardItem {
  event: string;
  project: string;
  // Slug of a project in data/projects.ts to cross-link to.
  projectSlug?: string;
  result: string;
  date: string;
}

export const awards: AwardItem[] = [
  {
    event: 'uOttawa CEED Design Day',
    project: 'EmotiCare',
    projectSlug: 'emoticare',
    result: 'Winner',
    date: 'Winter 2026',
  },
];

export interface EducationItem {
  school: string;
  program: string;
  range: string;
  location: string;
  coursework: string[];
}

export const education: EducationItem[] = [
  {
    school: 'University of Ottawa',
    program: 'BASc, Electrical Engineering & Management',
    range: 'Sep 2025 – Jan 2030',
    location: 'Ottawa, ON',
    coursework: [
      'Circuits',
      'Digital Systems',
      'Signals & Systems',
      'Engineering Design',
      'Business Management',
      'Accounting',
    ],
  },
];
