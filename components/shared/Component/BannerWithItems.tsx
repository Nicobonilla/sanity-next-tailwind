import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/utils';
import ItemBanner from './ItemBanner';
import type { ItemProps } from '@/components/pages/PageTemplate';

import { ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';

// Componente de PortableText con estilos personalizados
export const PTextBannerIcons: PortableTextComponents = {
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
        'relative z-20 mx-auto flex flex-col items-center justify-center py-16',
        data.imagePosition == 'background'
          ? 'lg:max-w-none'
          : 'lg:max-w-screen-xl'
      )}
    >
      {data.content && (
        <div
          className={clsx(
            'mb-12 md:mb-14',
            data.imagePosition == 'background' && 'text-white'
          )}
        >
          <PortableText
            value={data.content || []}
            components={PTextBannerIcons}
          />
        </div>
      )}
      {data?.items && (
        <div
          className={clsx(
            'mx-auto grid max-w-md grid-cols-2 items-start justify-center gap-1',
            'md:max-w-full md:grid-cols-3 md:gap-2',
            'lg:grid-cols-4'
          )}
        >
          {data.items.map(
            (item, index) =>
              item && <ItemBanner key={index} item={item as ItemProps} />
          )}
        </div>
      )}
    </div>
  );
}

// Componente principal del Banner con fondo condicional
export default function BannerWithItems({ data }: { data: ComponentProps }) {
  // Establecemos el estilo del fondo condicionalmente
  const backgroundImageStyle =
    data.imagePosition == 'background' && data.image
      ? {
          backgroundImage: `url(${urlForImage(data.image)?.url() || '/meeting.jpeg'})`,
        }
      : {};

  return (
    <div
      className={clsx(
        'relative w-full',
        data.imagePosition == 'background' &&
          'min-h-screen md:min-h-0 lg:max-h-fit'
      )}
    >
      {/* Fondo condicional */}
      <div
        className={clsx(
          data.imagePosition == 'background' &&
            'z-0 bg-cover bg-fixed bg-center'
        )}
        style={backgroundImageStyle}
      >
        {/* Filtro de color oscuro sobre la imagen si tiene fondo */}
        {data.imagePosition == 'background' && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-black/80" />
        )}
        {/* Renderiza el contenido y los items */}
        <Inner data={data} />
      </div>
    </div>
  );
}
