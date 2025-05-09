import React from 'react';
import { PortableTextComponents, PortableText } from 'next-sanity';

import { ComponentProps, ItemProps } from '@/components/types';
import clsx from 'clsx';
import Background from '../Background';

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
        <p className="absolute w-full text-center transition-transform duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0">
          {children}
        </p>

        {/* Segundo texto: aparece al hover */}
        <p className="absolute w-full -translate-x-full text-center opacity-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          {children}
        </p>
      </div>
    ),
  },
};
// Componente Inner: Renderiza el contenido y los elementos dentro del banner
export default function BannerList({ data }: { data: ComponentProps }) {
  return (
    <Background data={data}>
      <div
        className={clsx(
          'relative z-20 mx-auto flex flex-col items-center justify-center',
          data.backgroundMode == 'image'
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
            {data.content.map(
              (
                line: ItemProps['content'][number] | null,
                indexItem: number
              ) => {
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
                        .map((text: string, indexContent: number) => {
                          return (
                            <h1
                              key={indexContent}
                              className={clsx(
                                'absolute w-full text-center font-extrabold leading-5 transition-transform duration-300 ease-in-out',
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
              }
            )}
          </div>
        )}
      </div>
    </Background>
  );
}
