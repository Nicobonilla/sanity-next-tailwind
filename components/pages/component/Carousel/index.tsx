'use client';

import { CarouselProps } from './types';
import EmblaCarousel from './EmblaCarousel';

const autoplayOptions = {
  delay: 4000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  dragFree: true,
  watchDrag: true,
};

export default function Carousel({ data }: CarouselProps) {
  return (
    <EmblaCarousel
      data={data}
      options={{ align: 'start', loop: true }}
      autoplayOptions={autoplayOptions}
    />
  );
}
