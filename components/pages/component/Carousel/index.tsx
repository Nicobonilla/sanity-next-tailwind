'use client';

import { CarouselProps } from './types';
import EmblaCarousel from './EmblaCarousel';
import { type EmblaOptionsType } from 'embla-carousel';

export default function Carousel({ data }: CarouselProps) {
  const autoplayOptions = {
    delay: 7000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    watchDrag: true,
  };
  console.log('data: ', data);
  const options: EmblaOptionsType = {
    align: 'start',
    loop: true,
    dragFree: false,
  };
  return (
    <EmblaCarousel
      data={data}
      options={options}
      autoplayOptions={autoplayOptions}
    />
  );
}
