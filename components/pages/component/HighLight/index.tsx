import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';

import { urlForImage } from '@/sanity/lib/utils';

import { ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';
import { Highlight1 } from '../../../shared/Highlight1';

// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-montserrat font-bold uppercase text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-2 font-bitter text-3xl font-semibold uppercase">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="font-bitter text-base font-semibold uppercase">
        {children}
      </p>
    ),
  },
};

export default function Highlight({ data }: { data: ComponentProps }) {
  return (
    <div className={'relative h-[400px] w-full lg:h-[200px]'}>
      <div
        className="z-0 h-full bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${urlForImage(data.image)?.url() || '/meeting.jpeg'})`,
        }}
      >
        <div
          className={clsx(
            'relative inset-0 z-20 my-auto flex h-full flex-col justify-center text-center text-white shadow-lg',
            'xs5: px-10',
            'lg:max-w-none'
          )}
        >
          <PortableText components={PTextBanner} value={data.content || []} />
        </div>
      </div>
      <div className="absolute inset-0 z-10 size-full bg-red-600/65 dark:bg-red-950/80"></div>
    </div>
  );
}
