'use client';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText, PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import PHeroImage from '@/components/pages/component/HeroImage/PTHeroImage';

// Definimos el tipo de PHeroImage para que TypeScript lo entienda
type PHeroImageType = {
  PT1: PortableTextComponents;
  PT2: PortableTextComponents;
};

export default function HeroImage({ data }: { data: ComponentProps }) {
  if (!data) {
    return (
      <section aria-label="Error" className="p-4 text-center">
        Error al cargar el banner.
      </section>
    );
  }

  // Desestructuración para una mejor legibilidad
  const { PTextBanner, content, image } = data;

  // Determinamos el componente a usar según el valor de PTextBanner
  const selectedComponent =
    PTextBanner && PHeroImage[PTextBanner as keyof PHeroImageType];

  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src={urlForImage(image)?.url() || '/meeting.jpeg'}
        alt="Hero image for the homepage"
        className="object-cover object-top"
        quality={100}
        fill
        priority
      />
      <div className="absolute inset-0 bg-red-700/60" />
      <div className="layer layer1 z-10 bg-gray-100 dark:bg-black" />
      <div className="layer layer2 bg-gray-100/70 dark:bg-black/60" />
      <div className="layer layer3 bg-gray-100/40 dark:bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-20 flex h-1/2 flex-col justify-center px-4 sm:-translate-y-20 md:w-4/5 md:px-0">
          <PortableText
            value={content || []} // Renderiza el contenido si está disponible
            components={selectedComponent || PHeroImage.PT1} // Usamos el componente adecuado, con valor por defecto
          />
          <button
            className="mt-5 max-w-[250px] rounded border-2 border-second-400 py-2 font-light text-white transition-all hover:bg-white/30 hover:font-bold"
            aria-label="Seguir para más información"
          >
            SEGUIR
          </button>
        </div>
      </div>
    </section>
  );
}
