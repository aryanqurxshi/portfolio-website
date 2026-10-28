import type { Metadata } from 'next';
import { Inter, Instrument_Serif, Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
// Game mode fonts: not preloaded, since most visitors never switch modes.
const pixel = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
  preload: false,
});
const arcade = VT323({ subsets: ['latin'], weight: '400', variable: '--font-arcade', display: 'swap', preload: false });

export const metadata: Metadata = {
  title: 'Aryan Qureshi',
  description: 'Electrical Engineering & Management @ University of Ottawa. Co-founder of VaultQ.',
  metadataBase: new URL('https://aryanqureshi.ca'),
  openGraph: {
    title: 'Aryan Qureshi',
    description: 'Electrical Engineering & Management @ University of Ottawa. Co-founder of VaultQ.',
    url: 'https://aryanqureshi.ca',
    type: 'website',
  },
};

// Runs before paint so the saved theme and mode never flash the wrong colours.
const themeScript = `(function(){var t,m;try{t=localStorage.getItem('theme');m=localStorage.getItem('mode')}catch(e){}if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.dataset.theme=t;d.dataset.mode=m==='game'?'game':'normal'})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${display.variable} ${pixel.variable} ${arcade.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
