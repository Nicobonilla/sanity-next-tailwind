import {
  Roboto_Slab,
  Crimson_Pro,
  Montserrat,
} from 'next/font/google';

const roboto_slab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
  display: 'swap',
  preload: false
});

const crimson_pro = Crimson_Pro({
  variable: '--font-crimson-pro',
  subsets: ['latin'],
  display: 'swap',
  preload: false
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  preload: false
});

export const fonts = {
  roboto_slab,
  crimson_pro,
  montserrat,
};
