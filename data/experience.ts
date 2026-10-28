export interface ExperienceItem {
  role: string;
  company: string;
  url?: string;
  range: string;
  location: string;
  logo?: string;
  // Shown under the row without expanding (used for the current role).
  summary?: string;
  points: string[];
  tags: string[];
  // Slug of a project in data/projects.ts to cross-link to.
  project?: string;
}

export interface ExperienceGroup {
  label: string;
  items: ExperienceItem[];
}

export const experience: ExperienceGroup[] = [
  {
    label: 'Building',
    items: [
      {
        role: 'Co-Founder & Engineer',
        company: 'VaultQ',
        range: 'Apr 2026 – Present',
        location: 'Ajax, ON',
        logo: '/logos/vaultq-mark.png',
        summary:
          'Co-founded VaultQ, my startup: one place for sneaker resellers to price, track, and sell their inventory — on iPhone and the web.',
        points: [
          'Tells resellers what a pair is worth right now and what they can safely pay for it.',
          'Keeps a whole collection organized: what you paid, what it’s worth today, and what you’ve made.',
          'Lets resellers list pairs for sale on major marketplaces straight from their inventory.',
          'Running a closed beta with 5 active testers ahead of App Store launch.',
        ],
        tags: ['Startup', 'iOS', 'Web', 'Resale'],
        project: 'vaultq',
      },
      {
        role: 'Founder',
        company: 'palace.to',
        url: 'https://www.instagram.com/palace.to/',
        range: 'Mar 2023 – Present',
        location: 'Ajax, ON',
        logo: '/logos/palace.jpg',
        points: [
          'Scaled a resale brand to $80,000+ in revenue, running sourcing, inventory, pricing, and Instagram-led marketing end to end.',
        ],
        tags: ['Resale', 'Pricing', 'Brand'],
      },
    ],
  },
  {
    label: 'Internships',
    items: [
      {
        role: 'Data Intern, Supply Chain Management',
        company: 'The Logistics Alliance',
        range: 'May 2026 – Aug 2026',
        location: 'Mississauga, ON',
        logo: '/logos/logistics-alliance.png',
        url: 'https://logisticsalliance.com',
        points: [
          'Built an internal tool that catches incorrect file types at intake and tunes the flagging filter against recurring patterns in rejected paperwork, reducing documents held for missing information.',
          'Reconciled Bills of Lading and Inbound Control Forms against system records and traced pipeline exceptions to root cause before they reached inventory counts.',
        ],
        tags: ['Data quality', 'Internal tooling', 'Excel'],
      },
      {
        role: 'Customer Success Intern',
        company: 'The Logistics Alliance',
        range: 'Jul 2025 – Sep 2025',
        location: 'Mississauga, ON',
        logo: '/logos/logistics-alliance.png',
        url: 'https://logisticsalliance.com',
        points: [
          "Supported enterprise accounts (Sobeys, Lindt, Kellogg's, Pepsi, Mondelēz) on shipment schedules.",
          'Maintained lead times in TC Software and ran Excel-based validation to improve reporting accuracy.',
        ],
        tags: ['TC Software', 'Excel', 'Enterprise accounts'],
      },
    ],
  },
];
