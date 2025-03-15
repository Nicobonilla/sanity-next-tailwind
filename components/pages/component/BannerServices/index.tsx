'use client';
import React from 'react';
import clsx from 'clsx';
import { PortableText, type PortableTextComponents } from 'next-sanity';

import Background from '../Background';
import type { ComponentWithServices } from '@/components/types';
import ItemServiceBanner from './Item/ItemServiceBanner';


export default function BannerServices({ data }: { data: ComponentWithServices }) {

  const PTextBannerService: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="font-montserrat text-2xl font-medium uppercase text-neutral-600 drop-shadow-lg md:w-1/3 md:text-4xl">
          {children}
        </h2>
      ),
      normal: ({ children }) => (
        <p className="mx-auto text-center text-base font-medium text-neutral-700/90 md:w-2/3 md:text-right">
          {children}
        </p>
      ),
    },
  };

  const PTextBannerServiceCard: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h2 className="h3 mx-auto mb-2 items-center justify-center font-montserrat text-sm font-extrabold">
          {children}
        </h2>
      ),
      normal: ({ children }) => (
        <p className="p3 pb-5 text-justify font-crimson text-base leading-none">
          {children}
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <span className="font-extrabold dark:text-red-500">{children}</span>
      ),
    },
  };
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
              components={PTextBannerService}
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
              (service: ComponentWithServices['services'], index: number) =>
                service && (
                  <ItemServiceBanner
                    key={index}
                    service={service}
                    PTextItem={PTextBannerServiceCard}
                  />
                )
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-white/70"></div>
    </Background>
  );
}
