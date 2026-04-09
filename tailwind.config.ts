import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0b0b11',
        panel: '#12131a',
        charcoal: '#161823',
        ink: '#050507',
        purple: {
          DEFAULT: '#9f7aea',
          muted: '#7c3aed',
          deep: '#6d28d9',
          soft: '#a78bfa',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 13, 32, 0.42)',
        glow: '0 0 0 1px rgba(255,255,255,0.05), 0 30px 80px rgba(124, 58, 237, 0.18)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(159, 122, 234, 0.16), transparent 35%), radial-gradient(circle at 80% 15%, rgba(124, 58, 237, 0.08), transparent 22%)',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
