import { ComponentProps } from '@/components/types';
import PHeroImage from '@/components/pages/component/HeroImage/PTHeroImage';
import { PortableText, PortableTextComponents } from 'next-sanity';

// Definimos el tipo de PHeroImage para que TypeScript lo entienda
type PHeroImageType = {
  PT1: PortableTextComponents;
  PT2: PortableTextComponents;
};

export default function PTextHero({ data }: { data: ComponentProps }) {
  const { PTextBanner, content } = data;
  // Determinamos el componente a usar según el valor de PTextBanner
  const selectedComponent =
    PTextBanner && PHeroImage[PTextBanner as keyof PHeroImageType];

  return (
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
  );
}
