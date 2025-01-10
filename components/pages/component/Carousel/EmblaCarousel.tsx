'use client';

import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Slide from './Slide';
import { CarouselProps } from './types';
import React, { useCallback } from 'react';
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
export default function EmblaCarousel({
  data,
  options,
  autoplayOptions,
}: CarouselProps) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);

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

  const handleMouseEnter = (index: number) => {
    setHoveredItemIndex(index);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  const getIsActive = (index: number) => {
    if (hoveredItemIndex !== null) {
      return hoveredItemIndex === index;
    }
    return activeIndex === index;
  };

  return (
    <section className="embla">
      <div ref={emblaRef} className="embla__viewport">
        <div className={`embla__container`}>
          {data?.items.map((slide: any, index: number) => (
            <div
              key={index}
              className="embla__slide"
              onClick={() => handleClick(index)}
            >
              <Slide
                key={index}
                slide={slide}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                isActive={getIsActive(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
