import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';

import { urlForImage } from '@/sanity/lib/utils';

import { ComponentProps } from '@/components/types';
import clsx from 'clsx';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';

// Componente de PortableText con estilos personalizados
export const PTextBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-crimson text-xl font-semibold uppercase text-red-700">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-10 font-robotoslab text-3xl font-light text-gray-700">
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
  const dataBg = data?.backgroundValue || {};
  const typeComponent = data?.typeComponentValue || '';
  return (
    <Background
      data={{
        ...dataBg,
        typeComponent,
      }}
    >
      <ImageBg
        imgBg={data?.imageBackground}
        imgBgType={dataBg?.imageBackgroundType}
      />

      <div
        className={clsx(
          'relative inset-0 z-20 flex flex-col items-center justify-center py-20 text-center text-neutral-800',
          'xs5:px-10',
          'md:py-auto md:mx-auto md:max-w-screen-lg'
        )}
      >
        <PortableText components={PTextBanner} value={data.content || []} />
      </div>

      <div className="absolute inset-0 z-10 size-full bg-white/25"></div>
    </Background>
  );
}
