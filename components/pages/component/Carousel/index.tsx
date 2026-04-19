'use client';

import { useEffect, useState } from 'react';
import { CarouselProps } from './types';
import { type EmblaOptionsType } from 'embla-carousel';
import Background from '../Background';
import SlideHero from './SlideHero';
import dynamic from 'next/dynamic';

const EmblaCarousel = dynamic(() => import('./EmblaCarousel'));

export default function Carousel({ data }: CarouselProps) {
  const [isHeroInteractiveReady, setIsHeroInteractiveReady] = useState(false);

  useEffect(() => {
    if (data.variant !== 'hero' || !data.items?.length) return;

    const enableHero = () => {
      window.requestAnimationFrame(() => {
        setIsHeroInteractiveReady(true);
      });
    };

    if (document.readyState === 'complete') {
      enableHero();
      return;
    }

    window.addEventListener('load', enableHero, { once: true });

    return () => {
      window.removeEventListener('load', enableHero);
    };
  }, [data.items?.length, data.variant]);

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

  if (data.variant === 'hero' && data.items?.[0]) {
    if (isHeroInteractiveReady) {
      return (
        <EmblaCarousel
          data={data}
          options={options}
          autoplayOptions={autoplayOptions}
        />
      );
    }

    return (
      <SlideHero
        slide={data.items[0]}
        layerStyle={data.backgroundValue.colors}
        index={0}
        staticMode
      />
    );
  }

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
