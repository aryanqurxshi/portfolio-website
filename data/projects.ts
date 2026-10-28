export interface ProjectLink {
  label: string;
  href: string;
}

import type { HighlightTone } from '@/components/Highlight';

export interface ProjectItem {
  slug: string;
  tone: HighlightTone;
  title: string;
  tagline: string;
  meta: string;
  image: string;
  gallery?: { src: string; alt: string }[];
  overview: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
}

export const projects: ProjectItem[] = [
  {
    slug: 'vaultq',
    tone: 'blue',
    title: 'VaultQ',
    tagline: 'Inventory, pricing & cross-listing for sneaker resale',
    meta: 'Co-founder · Apr 2026 – Present · closed beta',
    image: '/projects/vaultq.jpg',
    overview:
      'An iOS app and a web dashboard over one Express API that owns the market data, the pricing engine, and putting stock on sale across marketplaces.',
    highlights: [
      'Pricing engine blends bid, ask, and last-sale signals into a market value, then works backward through fees, shipping, condition, and target margin to a safe-buy price with a BUY / WATCH / PASS call.',
      'Barcode scanner resolves a box label to a product with live market data and a safe-buy price.',
      'Cross-lists pairs to StockX from the vault, with a guard that refuses an ask which would transact against a standing bid.',
      '482-test Vitest suite with golden tests pinning pricing output across refactors.',
      'Multi-tenant isolation enforced by Postgres row-level security on 9 tables, not application filters.',
    ],
    stack: ['SwiftUI', 'SwiftData', 'Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'Vitest'],
    links: [],
  },
  {
    slug: 'beacon',
    tone: 'teal',
    title: 'Beacon',
    tagline: 'AI clinical copilot for Ontario primary care',
    meta: 'AGI Ventures Healthcare Hackathon · Jul 2026 · 24 hours',
    image: '/projects/beacon.svg',
    overview:
      "Beacon sits alongside a physician's existing workflow and handles what their EMR can't: ambient documentation, billing, and inbox triage. Built in 24 hours.",
    highlights: [
      'Drafts structured SOAP notes from recorded visits — nothing is filed to the chart without physician approval.',
      'Suggests OHIP billing codes from the visit content and the patient’s conditions.',
      'Ranks the physician inbox by clinical urgency so critical results surface first.',
      'Chart search grounded in hybrid vector + full-text retrieval, so answers cite the source note instead of making unsupported claims.',
    ],
    stack: ['Python', 'Next.js', 'PostgreSQL + pgvector', 'Drizzle', 'Claude API', 'RAG'],
    links: [],
  },
  {
    slug: 'alten',
    tone: 'green',
    title: 'Alten',
    tagline: 'Online help for seniors that points, speaks & protects',
    meta: 'Chrome extension · Sep 2026',
    image: '/projects/alten.jpg',
    gallery: [
      { src: '/projects/alten-how.jpg', alt: 'How Alten works: ask, Alten points, you click' },
      { src: '/projects/alten-architecture.jpg', alt: 'Alten architecture diagram' },
    ],
    overview:
      'An AI buddy for seniors: tap the smiley in the corner, say what you want in your own words, and Alten shows the exact button to press, says each step out loud in your language, stops scams, and keeps family in the loop.',
    highlights: [
      'Reads the page, finds the right button, and points at it with a 2–7 word caption — the user always does the clicking.',
      'Scam guard flags pressure tactics like “verify your account now” before they get tapped, and emails family an alert.',
      'Speaks and listens in the user’s own language with ElevenLabs Scribe (speech-to-text) and Multilingual v2 (text-to-speech).',
      'Family dashboard with a weekly recap: times Alten was asked for help, tasks finished solo, scams blocked.',
      'Events stored in TimescaleDB on Tiger Cloud (4 hypertables, 3 continuous aggregates) behind a Next.js 16 dashboard with 14 API routes.',
    ],
    stack: ['Chrome MV3', 'Google Gemma 4', 'ElevenLabs', 'Next.js 16', 'TimescaleDB', 'Resend', 'Vercel'],
    links: [{ label: 'alten.select', href: 'https://alten.select' }],
  },
  {
    slug: 'emoticare',
    tone: 'garnet',
    title: 'EmotiCare',
    tagline: 'Real-time emotional wellness dashboard for classrooms',
    meta: 'uOttawa Design Day winner · Jan – Mar 2026',
    image: '/projects/emoticare.jpeg',
    overview:
      'Students step in front of a webcam through the day; EmotiCare classifies their emotion in real time and gives educators a dashboard of the class, flagging students who need attention.',
    highlights: [
      'Classifies student emotion in real time and surfaces per-student trends, flagging sustained negative patterns.',
      'Stores only facial recognition descriptors rather than images, so students can be re-identified across sessions without retaining any photos.',
      'Won uOttawa Design Day (Winter 2026) in the first-year engineering cohort.',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB Atlas', 'face-api.js', 'Vercel'],
    links: [
      { label: 'emoticare.ca', href: 'https://emoticare.ca' },
      { label: 'GitHub', href: 'https://github.com/aryanqurxshi/emoticare' },
    ],
  },
];
