import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { CarouselProps } from '../types';
import Autoplay from 'embla-carousel-autoplay';

export function useCarouselEffects({
  options,
  autoplayOptions,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => setTransitioning(true);
    const onSettled = () => setTransitioning(false);

    emblaApi.on('scroll', onScroll);
    emblaApi.on('settle', onSettled);

    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('settle', onSettled);
    };
  }, [emblaApi]);

  return { emblaRef, emblaApi, transitioning };
}
