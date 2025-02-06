import { PortableTextComponents } from 'next-sanity';
import { ItemProps } from '@/components/types';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';
import PTextHero from '../Background/PTextHero';
import { ColorList } from '../Background/utils';

type SlideHeroProps = {
  slide: ItemProps;
  layerStyle: ColorList;
};

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
const SlideHero = ({ slide, layerStyle }: SlideHeroProps) => {
  return (
    <Background
      data={{
        ...slide,
        typeComponent: 'carousel',
        variant: 'hero',
        colors: layerStyle,
      }}
    >
      <ImageBg imgBg={slide?.image} imgBgType={'dynamic'} />
      <PTextHero data={{ content: slide?.content, PTextBanner: 'PT1' }} />
    </Background>
  );
};

export default SlideHero;
