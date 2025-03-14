import React from 'react';
import { PortableText, type PortableTextComponents } from 'next-sanity';
import { type ComponentProps } from '@/components/types';
import clsx from 'clsx';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';

export default function Highlight({ data }: { data: ComponentProps }) {
  const dataBg = data?.backgroundValue || {};
  const PTextBannerDark1: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="font-crimson text-xl font-semibold uppercase text-red-700">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          className={clsx(
            'mb-10 font-robotoslab text-2xl font-light text-gray-700 drop-shadow-sm',
            'lg:text-3xl 2xl:text-3xl'
          )}
        >
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="font-robotoslab text-base font-light text-gray-900">
          {children}
        </p>
      ),
    },
  };
  return (
    <Background
      data={{
        ...dataBg,
        typeComponent: 'highLight',
      }}
    >
      <ImageBg
        imgBg={data?.imageBackground}
        index={1}
      />

      <div
        className={clsx(
          'relative inset-0 z-20 flex flex-col items-center justify-center py-20 text-center text-neutral-800',
          'xs5:px-10',
          'md:py-auto md:mx-auto md:max-w-screen-lg'
        )}
      >
        <PortableText
          components={PTextBannerDark1}
          value={data.content || []}
        />
      </div>

      <div className="absolute inset-0 z-10 size-full bg-white/25"></div>
    </Background>
  );
}
