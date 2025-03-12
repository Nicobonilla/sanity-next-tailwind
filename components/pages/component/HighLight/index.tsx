import React from 'react';
import { PortableText } from 'next-sanity';
import { ComponentProps } from '@/components/types';
import clsx from 'clsx';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';
import { PTextBannerDark1 } from '../PTextComponents';

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
        index={0}
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
