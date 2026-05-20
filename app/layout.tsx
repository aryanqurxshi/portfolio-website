import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { RetroEffects } from '../components/RetroEffects';

export const metadata: Metadata = {
  title: 'Aryan Qureshi | Electrical Engineering Student @ University of Ottawa',
  description: 'Premium personal portfolio website with a dark, minimal brand identity.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Atmosphere layers — ordered back→front */}
        <div className="crt-grid" aria-hidden="true" />
        <div className="star-field" aria-hidden="true">
          <div className="star-layer star-layer-1" />
          <div className="star-layer star-layer-2" />
        </div>

        {/* Content */}
        {children}

        {/* Screen-effect overlays — sit above content */}
        <div className="rpg-scanlines" aria-hidden="true" />
        <div className="crt-vignette" aria-hidden="true" />
        <div className="crt-flicker-overlay" aria-hidden="true" />

        {/* Interactive retro effects: cursor trail, click beep, mute toggle */}
        <RetroEffects />
      </body>
    </html>
  );
}
