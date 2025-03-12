'use client';
import { ComponentProps } from '@/components/types';
import { PortableText, PortableTextComponents } from 'next-sanity';
import clsx from 'clsx';

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
  return (
    <div className="absolute inset-0 my-auto flex items-center justify-center text-center">
      <div
        className={clsx(
          'relative z-20 flex h-full flex-col justify-center px-4',
          'md:w-4/5 md:px-0',
          'lg:h-2/3 lg:translate-y-10'
        )}
      >
        <PortableText
          value={data || []} // Renderiza el contenido si está disponible
          components={PTextBanner} // Usamos el componente adecuado, con valor por defecto
        />
      </div>
    </div>
  );
}
