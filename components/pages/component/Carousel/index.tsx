import EmblaCarousel from './EmblaCarousel';
import { type EmblaOptionsType } from 'embla-carousel';
import Background from '../Background';
import type { ComponentProps, ComponentWithBannerPosts } from '@/components/types';
import type { ColorItem } from '@/sanity.types';

export type CarouselProps = {
  data: ComponentProps | ComponentWithBannerPosts;
  options: EmblaOptionsType;
  autoplayOptions?: {
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
  };
};

export default function Carousel({ data }: CarouselProps) {
  const autoplayOptions = {
    delay: 7000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    watchDrag: true,
  };
  //console.log('data: ', data  );
  const options: EmblaOptionsType = {
    align: 'start',
    loop: true,
    dragFree: false,
  };
  return (
    <>
      {data?.variant == 'post' && (
        <Background
          data={{
            typeComponent: 'carousel',
            variant: 'post',
          }}
        >
          <EmblaCarousel
            data={data as ComponentWithBannerPosts}
            options={options}
            autoplayOptions={autoplayOptions}
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
        >
          <EmblaCarousel
            data={data as ComponentProps}
            options={options}
            autoplayOptions={autoplayOptions}
          />
        </Background>
      )}
    </>
  );
}
