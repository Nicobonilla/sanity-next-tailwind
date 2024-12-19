import { EmblaCarouselType } from 'embla-carousel';
import { useEffect } from 'react';

type UseSequentialScrollProps = {
  emblaApi: EmblaCarouselType | undefined;
  hoveredItemIndex: number | null;
  setActiveIndex: (index: number) => void;
};

export function useSequentialScroll({
  emblaApi,
  hoveredItemIndex,
  setActiveIndex,
}: UseSequentialScrollProps) {
  useEffect(() => {
    if (!emblaApi || hoveredItemIndex !== null) return;

    const scrollNext = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
        setActiveIndex(emblaApi.selectedScrollSnap());
      } else {
        emblaApi.scrollTo(0);
        setActiveIndex(0);
      }
    };

    const timer = setInterval(scrollNext, 3000);
    return () => clearInterval(timer);
  }, [emblaApi, hoveredItemIndex, setActiveIndex]);
}
