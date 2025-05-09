'use client';

import { CarouselProps } from './types';
import EmblaCarousel from './EmblaCarousel';
import { type EmblaOptionsType } from 'embla-carousel';
import clsx from 'clsx';
import Background from '../Background';

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
      {data.typeComponent == 'carousel' && data.variant == 'post' ? (
        <Background
          data={{ ...data, typeComponent: 'carousel', variant: 'post' }}
        >
          <EmblaCarousel
            data={data}
            options={options}
            autoplayOptions={autoplayOptions}
          />
        </Background>
      ) : (
        <EmblaCarousel
          data={data}
          options={options}
          autoplayOptions={autoplayOptions}
        />
      )}
    </>
  );
}
