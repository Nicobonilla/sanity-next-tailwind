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
          <source
            src={`https://${process.env.VIDEO_HERO}/${process.env.VIDEO_HERO_FILE}`}
            type={process.env.VIDEO_HERO_TYPE}
          />
        </video>
        <div
          className="absolute inset-0 bg-white/30 dark:bg-black/65"
          aria-hidden="true"
        ></div>
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative z-20 m-0 flex h-1/2 flex-col justify-center px-4 font-robotomono text-4xl font-light uppercase text-white md:w-4/5 md:px-0">
          comentanos que te gustaría evaluar
        </div>
        <div>
          <button className="text-light rounded border border-white px-5 py-2 text-2xl text-white">
            SEGUIR
          </button>
        </div>
      </div>
    </section>
  );
}
