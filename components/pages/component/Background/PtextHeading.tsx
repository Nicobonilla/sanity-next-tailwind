import { ComponentProps } from '@/components/types';
import PHeroImage from '@/components/pages/component/HeroImage/PTHeroImage';
import { PortableText, PortableTextComponents } from 'next-sanity';
import clsx from 'clsx';

// Definimos el tipo de PHeroImage para que TypeScript lo entienda
type PHeroImageType = {
  PT1: PortableTextComponents;
  PT2: PortableTextComponents;
};
// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-robotoslab text-3xl uppercase text-white drop-shadow-md">
        {children}
      </h1>
    ),
  },
};
export default function PtextHeading({ data }: { data: ComponentProps }) {
  const { content } = data;
  return (
    <div className="absolute inset-0 my-auto flex items-center justify-center text-center">
      <div
        className={clsx(
          'relative z-20 flex h-full flex-col justify-center px-4',
          'md:w-4/5 md:px-0',
          'lg:translate-y-10'
        )}
      >
        <PortableText
          value={content || []} // Renderiza el contenido si está disponible
          components={PTextBanner} // Usamos el componente adecuado, con valor por defecto
        />
      </div>
    </div>
  );
}
