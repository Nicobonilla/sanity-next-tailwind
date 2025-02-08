import {
  Inter,
  Roboto_Flex,
  Roboto_Slab,
  Roboto_Mono,
  Crimson_Pro,
  Montserrat,
  Bitter,
  Fira_Sans,
} from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
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

export const fonts = {
  inter,
  roboto_flex,
  roboto_slab,
  roboto_mono,
  crimson_pro,
  montserrat,
  bitter,
  fira_sans,
};
