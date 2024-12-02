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
export const PTextItem: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <div className="group relative h-16 overflow-hidden">
        {/* Primer texto: visible inicialmente */}
        <p className="absolute w-full transform text-center transition-transform duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0">
          {children}
        </p>

        {/* Segundo texto: aparece al hover */}
        <p className="absolute w-full translate-x-[-100%] transform text-center opacity-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          {children}
        </p>
      </div>
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
    >
      {/* Renderiza los Items del banner */}
      {data?.content && (
        <div
          className={clsx(
            'grid h-fit w-full grid-cols-1 place-content-center justify-center dark:text-slate-300',
            'xs4:grid-cols-2',
            'xs5:px-4',
            'sm:grid-cols-3',
            'md:grid-cols-4',
            'lg:h-[800px] lg:max-w-[1350px] lg:grid-cols-5'
          )}
        >
          {data.content.map((line, indexItem) => {
            return (
              line?.children?.[0].text && (
                <div
                  key={indexItem}
                  className={clsx(
                    'group relative h-20 cursor-pointer place-content-center overflow-hidden bg-white/70 p-2 dark:bg-black/70 sm:h-24'
                  )}
                >
                  {line?.children?.[0].text
                    .split(':')
                    .map((text, indexContent) => {
                      return (
                        <h1
                          key={indexContent}
                          className={clsx(
                            'absolute w-full  transform text-center font-extrabold leading-5 transition-transform duration-500 ease-in-out',
                            {
                              'group-hover:translate-x-full group-hover:opacity-0':
                                indexContent === 0,
                              'translate-x-[-100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100':
                                indexContent === 1,
                            }
                          )}
                        >
                          {text}
                        </h1>
                      );
                    })}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

// Componente principal del Banner con fondo condicional
export default function BannerList({ data }: { data: ComponentProps }) {
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
          'min-h-screen xs5:min-h-fit md:h-[800px]'
      )}
    >
      {/* Fondo condicional */}
      <div
        className={clsx(
          data.imagePosition == 'background' &&
            'z-0 h-full bg-cover bg-fixed bg-center'
        )}
        style={backgroundImageStyle}
      >
        {/* Filtro de color oscuro sobre la imagen si tiene fondo */}
        {data.imagePosition == 'background' && (
          <div className="absolute inset-0 z-10 max-h-fit" />
        )}
        {/* Renderiza el contenido y los items */}
        <Inner data={data} />
      </div>
    </div>
  );
}
