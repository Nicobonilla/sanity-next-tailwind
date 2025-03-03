'use client';

import Background from '../component/Background';
import clsx from 'clsx';

export default function CarouselHeroSkeleton() {
  // Renderizar directamente el carrusel para variant 'hero'
  return (
    <section className="embla_hero">
      <div className="embla__viewport">
        <div className="embla__container">
          <div className="embla__slide">
            <Background
              data={{
                typeComponent: 'carousel',
                variant: 'hero',
              }}
            ></Background>
          </div>
        </div>
      </div>
    </section>
  );
}
