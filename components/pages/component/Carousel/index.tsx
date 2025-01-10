'use client';

import { CarouselProps } from './types';
import EmblaCarousel from './EmblaCarousel';
import { type EmblaOptionsType } from 'embla-carousel';

const autoplayOptions = {
  delay: 4000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  watchDrag: true,
};

const options: EmblaOptionsType = {
  align: 'start',
  loop: true,
  dragFree: false,
};

export default function Carousel({ data }: CarouselProps) {
  return (
    <EmblaCarousel
      data={data}
      options={options}
      autoplayOptions={autoplayOptions}
    />
  );
}
