export interface ExperienceItem {
  title: string;
  company: string;
  range: string;
  location: string;
  summary: string;
  whatIDid?: string[];
  howIDid?: string[];
  skillsLearned?: string[];
  technologies?: string[];
  achievements?: string[];
  links?: {
    website?: string;
    instagram?: string;
  };
}

export const experience: ExperienceItem[] = [
  {
    title: 'Customer Success Specialist',
    company: 'The Logistics Alliance',
    range: 'July 2025 – September 2025',
    location: 'Missisauga, ON',
    summary:
      'Worked within the Customer Success department, supporting enterprise-level clients and ensuring seamless communication regarding shipment schedules, transit delays, and delivery performance.',
    whatIDid: [
      'Served as the primary point of contact for enterprise customers including Sobeys, Lindt, Kellogg’s, Pepsi, and Mondelēz.',
      'Monitored shipments daily to identify delays and proactively coordinated resolution across operations teams.',
      'Maintained accurate lead times in TC Software and communicated updates to customer stakeholders.',
    ],
    howIDid: [
      'Used TC Software to track customer-specific transit requirements and update shipment statuses.',
      'Collaborated with internal operations, carriers, and customer success teams to resolve logistics issues.',
      'Performed Excel-driven data validation and cleanup to improve reporting accuracy.',
    ],
    skillsLearned: ['Customer communication', 'Logistics coordination', 'Data accuracy', 'Issue escalation'],
    technologies: ['TC Software', 'Microsoft Excel'],
    achievements: ['Maintained timely communication for major retail accounts', 'Improved lead-time accuracy and reporting reliability'],
  },
  {
    title: 'Founder',
    company: 'Palace.to',
    range: 'March 2023',
    location: 'Ajax, ON',
    summary:
      'Built a resale brand generating $80,000+ in sales, managing sourcing, pricing, inventory, and customer service across Instagram with a focus on brand positioning and growth.',
    whatIDid: [
      'Established sourcing and pricing workflows for resale inventory.',
      'Managed customer service and order logistics through social commerce.',
      'Designed brand strategy and promotional campaigns on Instagram.',
    ],
    howIDid: [
      'Leveraged Instagram for product discovery, customer outreach, and sales conversion.',
      'Tracked inventory and pricing in spreadsheets to support sales targets.',
      'Analyzed customer preferences and adapted product selection accordingly.',
    ],
    skillsLearned: ['Brand strategy', 'Digital marketing', 'Customer negotiation', 'Inventory management'],
    technologies: ['Instagram', 'Spreadsheet analytics'],
    achievements: ['Generated over $80,000 in resale revenue', 'Built a consistent online storefront and customer experience'],
    links: {
      instagram: 'https://www.instagram.com/palace.to/',
    },
  },
];
