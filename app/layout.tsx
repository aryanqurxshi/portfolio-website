import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aryan Qureshi | Electrical Engineering Student @ University of Ottawa',
  description: 'Premium personal portfolio website with a dark, minimal brand identity.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="rpg-scanlines" />
        <div className="rpg-particles" />
        {children}
      </body>
    </html>
  );
}
