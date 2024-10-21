import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        montserrat: ['Montserrat', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        crimson: ['"Crimson Text"', 'serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'body-dark': 'rgba(28,31,42,1.0)',
        menuColor2: 'rgba(48,54,73,1.0)',
        textBlue: 'rgba(5, 27, 129, 0.7)',
        drawerColor: 'rgba(0,44,84, 1.0)',
        dividerDrawer: 'rgba(49, 78, 105, 1)',
        second: colors.red, //green-600
        lay: 'rgba(70, 66, 85, 1)',
      },
      lineHeight: {
        'extra-tight': '1px',
      },
      screens: {
        xs: '320px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
};

export default config;
