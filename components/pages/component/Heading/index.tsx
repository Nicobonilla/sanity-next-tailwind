import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';

import { urlForImage } from '@/sanity/lib/utils';

import { ComponentProps } from '@/components/types';
import clsx from 'clsx';
import Background from '../Background';

// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-bitter text-3xl font-semibold uppercase text-gray-800">
        {children}
      </h1>
    ),
  },
};

export default function Heading({ data }: { data: ComponentProps }) {
  return (
    <div>
      <div className="relative h-24"></div>
      <Background data={data}>
        <div
          className={clsx(
            'relative inset-0 z-20 my-auto flex h-full flex-col justify-center text-center text-neutral-800 shadow-lg',
            'xs5: px-10',
            'lg:max-w-none'
          )}
        >
          <PortableText components={PTextBanner} value={data.content || []} />
        </div>
        <div className="absolute inset-0 z-10 size-full bg-white/65"></div>
      </Background>
    </div>
  );
}
