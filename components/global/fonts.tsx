import { Roboto_Mono, Montserrat, Bitter } from 'next/font/google';

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
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

export const fonts = {
  roboto_mono,
  montserrat,
  bitter,
};
