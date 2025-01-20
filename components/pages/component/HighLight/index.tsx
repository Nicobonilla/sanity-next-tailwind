import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';

import { urlForImage } from '@/sanity/lib/utils';

import { ComponentProps } from '@/components/types';
import clsx from 'clsx';

// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-crimson text-xl font-semibold uppercase text-red-700">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-robotoslab mb-10 text-3xl font-light text-gray-700">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="font-robotoslab text-base font-light text-gray-900">
        {children}
      </p>
    ),
  },
};

export default function Highlight({ data }: { data: ComponentProps }) {
  return (
    <div className={'relative h-[400px] w-full'}>
      <div
        className="z-0 h-full bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${urlForImage(data.imageBackground)?.url() || '/meeting.jpeg'})`,
        }}
      >
        <div
          className={clsx(
            'relative inset-0 z-20 my-auto flex h-full flex-col justify-center text-center text-neutral-800 shadow-lg',
            'xs5: px-10',
            'lg:max-w-none'
          )}
        >
          <PortableText components={PTextBanner} value={data.content || []} />
        </div>
      </div>
      <div className="absolute inset-0 z-10 size-full bg-white/65"></div>
    </div>
  );
}
