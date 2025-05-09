import { type EmblaOptionsType } from 'embla-carousel';
import { ComponentProps } from '@/components/types';

// Representa un ítem individual en el carrusel
export type ItemProps = {
  id: string;
  title: string;
  description?: string;
  image: string;
};

// Props para el carrusel principal
export type CarouselProps = {
  data?: ComponentProps;
  options: EmblaOptionsType;
  autoplayOptions?: {
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
  };
};

// Props específicas para un slide
export type SlideProps = {
  slide: ItemProps;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActive: boolean;
};
