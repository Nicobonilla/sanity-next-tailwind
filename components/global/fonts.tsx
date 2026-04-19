import {
  Cormorant_Garamond,
  Inter,
  Roboto_Flex,
  Roboto_Slab,
  Roboto_Mono,
  Crimson_Pro,
  Montserrat,
  Bitter,
  Fira_Sans,
  Source_Sans_3,
} from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const cormorant_garamond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const roboto_flex = Roboto_Flex({
  variable: '--font-roboto-flex',
  subsets: ['latin'],
  display: 'swap',
});

const roboto_slab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
});

const crimson_pro = Crimson_Pro({
  variable: '--font-crimson-pro',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const bitter = Bitter({
  variable: '--font-bitter',
  subsets: ['latin'],
  display: 'swap',
});

const fira_sans = Fira_Sans({
  variable: '--font-fira-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const source_sans_3 = Source_Sans_3({
  variable: '--font-source-sans-3',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const fonts = {
  cormorant_garamond,
  inter,
  roboto_flex,
  roboto_slab,
  roboto_mono,
  crimson_pro,
  montserrat,
  bitter,
  fira_sans,
  source_sans_3,
};
