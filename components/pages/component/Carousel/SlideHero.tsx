import clsx from 'clsx';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';
import PTextHero from '../Background/PTextHero';
import { ColorList } from '../Background/utils';
import { ItemProps } from '@/components/types';

type SlideHeroProps = {
  slide: ItemProps;
  layerStyle: ColorList;
  index: number;
  activeIndex?: number;
  staticMode?: boolean;
};

const SlideHero = ({
  slide,
  layerStyle,
  index,
  activeIndex,
  staticMode = false,
}: SlideHeroProps) => {
  const isActive = index === activeIndex;

  return (
    <Background
      data={{
        ...slide,
        typeComponent: 'carousel',
        variant: 'hero',
        colors: layerStyle,
      }}
    >
      <div
        className={clsx(
          'absolute inset-0',
          staticMode
            ? 'opacity-100'
            : 'transition-[transform,opacity] duration-[5000ms] ease-out',
          !staticMode && isActive ? 'scale-100 opacity-100' : '',
          !staticMode && !isActive ? 'scale-110 opacity-90' : ''
        )}
      >
        <ImageBg imgBg={slide?.image} imgBgType={'dynamic'} index={index} />
      </div>

      <PTextHero
        data={{ content: slide?.content, ctaLinkItem: slide?.ctaLinkItem }}
        index={index}
      />
    </Background>
  );
};

export default SlideHero;
