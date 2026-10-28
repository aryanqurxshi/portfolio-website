import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

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

// Runs before paint so the saved theme never flashes the wrong colours.
const themeScript = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
