import EmblaCarousel from './EmblaCarousel';
import Background from '../Background';
import type { ComponentProps, ComponentWithBannerPosts } from '@/components/types';
import type { ColorItem } from '@/sanity.types';
import type { CSSProperties } from 'react';

export type CarouselProps = {
  data: ComponentProps | ComponentWithBannerPosts;
  styleBg?: CSSProperties | undefined;
};

export default function Carousel({ data, styleBg }: CarouselProps) {

  return (
    <>
      {data?.variant == 'post' && (
        <Background
          data={{
            typeComponent: 'carousel',
            variant: 'post',
          }}
          styleBg={styleBg}
        >
          <EmblaCarousel
            data={data as ComponentWithBannerPosts}
          />
        </Background>
      )}
      {data?.variant == 'hero' && (
        <Background
          data={{
            typeComponent: "carousel",
            variant: "hero",
            colors: data?.backgroundValue?.colors as ColorItem[],
            layer: data?.backgroundValue?.layer ?? undefined
          }}
          styleBg={styleBg}

        >
          <EmblaCarousel
            data={data as ComponentProps}
          />
        </Background>
      )}
    </>
  );
}
