'use client';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText, PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import PHeroImage from '@/components/shared/PortableText/HeroImage';
import clsx from 'clsx';

// Definimos el tipo de PHeroImage para que TypeScript lo entienda
type PHeroImageType = {
  PT1: PortableTextComponents;
  PT2: PortableTextComponents;
};

export default function HeroVideo() {
  return (
    <section className="relative h-[70vh] w-full">
      <div className="relative aspect-auto h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full w-full object-cover"
        >
          <source src="/videos/vid1.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="px-20 pb-2 font-bitter text-2xl font-light uppercase text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {'Conectate ahora'}
          </h1>
          <button
            className={clsx(
              'h-10 w-28 rounded-r border border-white text-white',
              'hover:cursor-pointer hover:border-0 hover:bg-white/50 hover:text-black'
            )}
          >
            voy
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-20 flex h-1/2 flex-col justify-center px-4 sm:-translate-y-20 md:w-4/5 md:px-0">
          hola
        </div>
      </div>
    </section>
  );
}
