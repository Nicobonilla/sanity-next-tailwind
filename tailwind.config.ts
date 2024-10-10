import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
const colors = require('tailwindcss/colors')

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        menuColor: 'rgba(28,31,42,1.0)',
        menuColor2: 'rgba(48,54,73,1.0)',
        textBlue: 'rgba(5, 27, 129, 0.7)',
        drawerColor: 'rgba(0,44,84, 1.0)',
        dividerDrawer: 'rgba(49, 78, 105, 1)',
        second: colors.red , //green-600  
        lay: 'rgba(70, 66, 85,1)'
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
