# Premium Portfolio Website

A clean, dark-themed portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Modern dark brand with elegant purple accents
- Hero, experience, projects, case studies, GitHub, LinkedIn, contact form, and footer sections
- Smooth scroll, sticky navigation, mobile menu, polished motion
- Data-driven content layer for easy future updates
- Dedicated case study detail pages
- Accessible, responsive, and production-ready structure

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Update Content

Edit the structured data files inside `data/`:

- `data/profile.ts`
- `data/socials.ts`
- `data/experience.ts`
- `data/projects.ts`
- `data/caseStudies.ts`
- `data/github.ts`
- `data/linkedin.ts`

## Add New Case Studies

Add a new entry to `data/caseStudies.ts` and the site will automatically include it in the case studies section. The detail pages are generated using the `slug` field.

## Build for Production

```bash
npm run build
npm run start
```

## Notes

- The contact form currently includes client-side validation and is ready to connect to an email or server endpoint in the future.
- The GitHub section is scaffolded with placeholder repository data and can be integrated with the GitHub API later.
