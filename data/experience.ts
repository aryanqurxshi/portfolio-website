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
        logo: '/logos/vaultq.png',
        summary:
          'Co-founded VaultQ with a team of 2: a resale inventory platform across three surfaces on one API — a SwiftUI iOS app, a Next.js dashboard, and an Express/TypeScript backend on Postgres.',
        points: [
          'All pricing and fee arithmetic runs server-side, so no client can produce a conflicting number.',
          'Engineered an algorithmic safe-buy pricing engine that normalizes live market data from StockX, eBay, and Shopify REST APIs, backed by a 482-test Vitest suite with golden tests pinning pricing output across refactors.',
          'Enforced multi-tenant isolation with Postgres row-level security on 9 tables, and built a five-method marketplace adapter so a new platform is an adapter rather than a rewrite.',
          'Running a closed beta with 5 active testers ahead of App Store launch.',
        ],
        tags: ['SwiftUI', 'Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'Vitest'],
        project: 'vaultq',
      },
      {
        role: 'Founder',
        company: 'Palace.to',
        url: 'https://www.instagram.com/palace.to/',
        range: 'Mar 2023 – Present',
        location: 'Ajax, ON',
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
        points: [
          "Supported enterprise accounts (Sobeys, Lindt, Kellogg's, Pepsi, Mondelēz) on shipment schedules.",
          'Maintained lead times in TC Software and ran Excel-based validation to improve reporting accuracy.',
        ],
        tags: ['TC Software', 'Excel', 'Enterprise accounts'],
      },
    ],
  },
];
