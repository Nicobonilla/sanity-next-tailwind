import {
  Roboto_Slab,
  Crimson_Pro,
  Montserrat,
} from 'next/font/google';

const roboto_slab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  weight: ['200', '400', '300', '600']
});

const crimson_pro = Crimson_Pro({
  variable: '--font-crimson-pro',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  weight: ['200', '300', '400', '600']
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  weight: ['300', '400', '500', '600', '800']

});

export const fonts = {
  roboto_slab,
  crimson_pro,
  montserrat,
};
