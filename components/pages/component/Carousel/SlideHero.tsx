import Image from 'next/image';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { ItemProps } from '@/components/types';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';
import PTextHero from '../Background/PTextHero';

export const PText: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="mb-2 text-2xl font-bold text-white">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-sm opacity-90">{children}</p>
    ),
  },
};

const SlideHero = ({ data }: ItemProps) => {
  const dataBg = data?.backgroundValue || {};
  const dataComponent = {
    typeComponent: 'carousel',
    variant: 'hero',
  };
  const height = dataBg?.responsiveHeight || '';

  return (
    <Background
      data={{
        dataBg: dataBg,
        dataComponent,
      }}
    >
      {' '}
      <ImageBg imgBg={data?.image} imgBgType={'dynamic'} />
      <PTextHero data={{ content: data?.content, PTextBanner: 'PT1' }} />
    </Background>
  );
};

export default SlideHero;
