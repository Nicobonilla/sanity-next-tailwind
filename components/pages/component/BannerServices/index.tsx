import React from 'react';
import clsx from 'clsx';
import { PortableText } from 'next-sanity';

import Background from '../Background';
import { ComponentProps } from '@/components/types';
import PTextBanner from './PTextBanner';
import { urlForImage } from '@/sanity/lib/utils';
import ItemServiceBanner from './Item/ItemServiceBanner';
import { PTextBannerServiceCard } from '../PTextComponents';
import Image from 'next/image';

export default function BannerServices({ data }: { data: ComponentProps }) {
  const dataBg = data?.backgroundValue || {};
  return (
    <Background
      data={{
        ...dataBg,
        typeComponent: 'bannerServices',
      }}
    >
      <div
        className={clsx(
          'relative z-20 mx-auto h-fit px-3 py-16',
          'lg:max-w-screen-xl'
        )}
      >
        {/* Title and Premise Section */}
        {data.content && (
          <div
            className={clsx(
              'mb-14 flex flex-col items-center justify-center gap-4 text-center md:flex-row'
            )}
          >
            <PortableText
              value={data.content || []}
              components={PTextBannerServiceCard}
            />
          </div>
        )}

        <div className={clsx('relative z-10 flex h-full flex-col gap-6')}>
          <div
            className={clsx(
              'grid size-full gap-0',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {data?.services?.map(
              (service: ComponentProps['services'], index: number) =>
                service && (
                  <ItemServiceBanner
                    key={index}
                    service={service}
                    PTextItem={PTextBanner['PT3']}
                  />
                )
            )}
          </div>
        </div>
      </div>
      {false && (
        <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-start">
          <div className="relative z-0 h-full w-full">
            <Image
              src={urlForImage(data.imageBackground)?.url()}
              alt="vec1"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      <div className="absolute inset-0 z-10 bg-white/70"></div>
    </Background>
  );
}
