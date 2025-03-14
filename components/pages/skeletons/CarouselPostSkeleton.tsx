'use client';

import Background from '../component/Background';
import clsx from 'clsx';

export default function CarouselPostSkeleton() {
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
            >
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div
                  className={clsx(
                    'relative z-20 flex h-fit flex-col items-center justify-center bg-black/70 px-4 py-8',
                    'md:w-4/5 md:max-w-screen-lg md:px-20'
                  )}
                ></div>
              </div>
            </Background>
          </div>
        </div>
      </div>
    </section>
  );
}
