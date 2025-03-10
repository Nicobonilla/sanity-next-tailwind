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
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        inter: ['var(--font-inter)', 'sans-serif'],
        robotoslab: ['var(--font-roboto-slab)', 'sans-serif'],
        crimson: ['var(--font-crimson-pro)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        bitter: ['var(--font-bitter)', 'sans-serif'],
        fira: ['var(--font-fira-sans)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        bodydark: 'rgba(28,31,42,1.0)',
        menuColor2: 'rgba(48,54,73,1.0)',
        primary: 'rgba(178, 34, 34, 1)',
        lavanda1: 'rgba(229, 212, 250, 1)',
        lavanda2: 'rgba(199, 180, 245, 1)',
        second: colors.red, //green-600
        verde: 'rgba(17, 122, 101, 1)',
        dorado: 'rgba(212, 175, 55, 1)'
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
  plugins: [typography],
};

export default config;
