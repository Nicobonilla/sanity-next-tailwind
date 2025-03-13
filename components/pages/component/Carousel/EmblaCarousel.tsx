'use client';

import { useEffect, useState, useCallback } from 'react';

import SlideHero from './SlideHero';
import SlidePost from './SlidePost'; // Importa el nuevo SlidePost
import { ColorList } from '../Background/utils';
import clsx from 'clsx';
import { PortableText, PortableTextComponents } from 'next-sanity';

import { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';

import { CarouselProps } from './types';
import { ItemProps } from '@/components/types';
import {
  GetPostListByUnitBusinessQueryResult,
  GetPostListQueryResult,
} from '@/sanity.types';

export default function EmblaCarousel({
  data,
  options,
  autoplayOptions,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const fadePlugin = data?.variant === 'hero' ? Fade() : undefined;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    [Autoplay(autoplayOptions), fadePlugin].filter(
      (plugin): plugin is NonNullable<typeof plugin> => Boolean(plugin)
    )
  );

  // Sync with Embla's internal state
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Click side slide to scroll carousel in mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (isMobile && emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [isMobile, emblaApi]
  );

  return (
    <section
      className={clsx({
        embla_hero: data?.variant == 'hero',
        'embla_post mx-auto h-fit max-w-screen-xl items-center justify-center px-4':
          data?.variant == 'post',

        embla: data?.variant != 'post' && data?.variant != 'hero',
      })}
    >
      {data.variant == 'post' && (
        <div className="relative flex h-full flex-col">
          <div className="relative flex size-full items-center justify-start">
            <PortableText
              value={data.content || []}
              components={
                {
                  block: {
                    h2: ({ children }) => (
                      <h2
                        className={clsx(
                          'mb-4 text-left font-robotoslab text-2xl font-semibold text-neutral-700 drop-shadow-sm',
                          'lg:text-3xl 2xl:text-3xl'
                        )}
                      >
                        {children}
                      </h2>
                    ),
                  },
                } as PortableTextComponents
              }
            />
          </div>
        </div>
      )}
      <div ref={emblaRef} className="embla__viewport">
        <div className={`embla__container`}>
          {data?.variant == 'post' &&
            data?.bannerPostsItems?.map(
              (
                slide:
                  | GetPostListQueryResult[number]
                  | GetPostListByUnitBusinessQueryResult[number],
                index: number
              ) => (
                <div
                  key={index}
                  className="embla__slide"
                  onClick={() => handleClick(index)}
                >
                  <SlidePost key={index} post={slide} />
                </div>
              )
            )}

          {data?.variant == 'hero' &&
            data?.items?.map((slide: ItemProps, index: number) => (
              <div
                key={index}
                className="embla__slide"
                onClick={() => handleClick(index)}
              >
                <SlideHero
                  key={`${index}-${activeIndex}`}
                  slide={slide as ItemProps}
                  layerStyle={data.backgroundValue.colors as ColorList}
                  index={index}
                  activeIndex={activeIndex}
                />
              </div>
            ))}

        </div>
      </div>
    </section>
  );
}
