import React from 'react';
import { PortableTextComponents } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/utils';

import { ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';

// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h2 mb-6 text-center uppercase">{children}</h1>
    ),
    normal: ({ children }) => <p className="p3 text-center">{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

// Componente Inner: Renderiza el contenido y los elementos dentro del banner
function Inner({ data }: { data: ComponentProps }) {
  return (
    <div
      className={clsx(
        'relative z-20 mx-auto flex flex-col items-center justify-center',
        data.imagePosition == 'background'
          ? 'lg:max-w-none'
          : 'lg:max-w-screen-xl'
      )}
    ></div>
  );
}
export default function BannerList({ data }: { data: ComponentProps }) {
  return (
    <div className={'relative h-[300px] w-full'}>
      {/* Fondo condicional */}
      <div
        className={'z-0 h-full bg-cover bg-fixed bg-center'}
        style={{
          backgroundImage: `url(${urlForImage(data.image)?.url() || '/meeting.jpeg'})`,
        }}
      >
        {/* Filtro de color oscuro sobre la imagen si tiene fondo */}
        {data.imagePosition === 'background' && (
          <div className="absolute inset-0 z-10 max-h-fit" />
        )}
        {/* Renderiza el contenido y los items */}
        <Inner data={data} />
      </div>
      <div className="z-30 bg-gradient-to-t from-rose-600/80 to-red-500/90"></div>
    </div>
  );
}
