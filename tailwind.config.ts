import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        robotoslab: ['var(--font-roboto-slab)', 'sans-serif'],
        crimson: ['var(--font-crimson-pro)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        bodydark: 'rgba(28,31,42,1.0)',
        menuColor2: 'rgba(48,54,73,1.0)',
      },
      lineHeight: {
        'extra-tight': '1px',
      },
      screens: {
        xs4: '400px',
        xs5: '500px',
        xs6: '600px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
