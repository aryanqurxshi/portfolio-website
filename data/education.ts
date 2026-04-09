export interface EducationItem {
  institution: string;
  location: string;
  program: string;
  dates: string;
  summary: string;
  highlights: string[];
}

export const education: EducationItem[] = [
  {
    institution: 'University of Ottawa',
    location: 'Ottawa, ON',
    program: 'BASc Electrical Engineering',
    dates: 'Sept 2025 - Present',
    summary:
      'Completed foundational coursework in engineering mathematics, physics and programming, building a strong technical base for advanced electrical engineering studies.',
    highlights: [
      'Developed analytical problem-solving skills through structured engineering labs, assignments, and projects.',
      'Gained experience applying engineering concepts to real-world problems, with emphasis on logical thinking, precision, and documentation.',
      'Strengthened time management and workload prioritization skills while balancing a demanding academic schedule with professional work experience.',
    ],
  },
];
