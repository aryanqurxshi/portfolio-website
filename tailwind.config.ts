import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'rgb(var(--foreground-rgb) / <alpha-value>)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        meta: 'var(--meta)',
        divider: 'var(--divider)',
        well: 'var(--well)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        pixel: ['var(--font-pixel)', 'ui-monospace', 'monospace'],
        arcade: ['var(--font-arcade)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '720px',
      },
    },
  },
  plugins: [
    // `game:` styles only apply while game mode is on.
    plugin(({ addVariant }) => addVariant('game', ':root[data-mode="game"] &')),
  ],
};

export default config;
