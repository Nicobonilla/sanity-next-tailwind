'use client';

import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useCarouselEffects } from './hooks/useCarouselEffects';
import { useHoverHandlers } from './hooks/useHoverHandlers';
import Slide from './Slide';
import { CarouselProps } from './types';
import { useSequentialScroll } from './hooks/useSequentialScroll';

export default function EmblaCarousel({
  data,
  options,
  autoplayOptions,
}: CarouselProps) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { emblaRef, emblaApi, transitioning } = useCarouselEffects({
    options,
    autoplayOptions,
  });

  useSequentialScroll({ emblaApi, hoveredItemIndex, setActiveIndex });

  const { handleMouseEnter, handleMouseLeave, getIsActive } = useHoverHandlers({
    emblaApi,
    setHoveredItemIndex,
    setActiveIndex,
    hoveredItemIndex,
    activeIndex,
  });

  return (
    <div ref={emblaRef} className="relative overflow-hidden">
      <div
        className={`flex transition-transform duration-300 ${
          transitioning ? 'pointer-events-none' : ''
        }`}
      >
        {data?.items.map((slide, index) => (
          <Slide
            key={slide.id}
            slide={slide}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            isActive={getIsActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
