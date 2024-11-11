import React from 'react';
import ItemBannerIcons from './ItemBannerIcons';
import { Banner } from '@/sanity.types';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { ItemProps } from './ItemBannerIcons';
import { urlForImage } from '@/sanity/lib/utils';

export const PTextBannerIcons: PortableTextComponents = {
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

export default function IconList({ data }: { data: Banner }) {
  if (!data?.items) {
    return <p>No data available</p>;
  }

  return (
    <div className="relative min-h-screen w-full md:min-h-0 lg:max-h-fit">
      <div
        className="z-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${urlForImage(data.image)?.url() || '/meeting.jpeg'})`,
        }}
      >
        <div className="absolute inset-0 z-10 bg-white/80 dark:bg-black/80"></div>
        <div className="relative z-20 flex flex-col items-center justify-center px-4 py-16">
          {data.content && (
            <div className="mb-12 md:mb-14">
              <PortableText
                value={data.content || []}
                components={PTextBannerIcons}
              />
            </div>
          )}
          {data?.items && data.items.length > 0 && (
            <div className="mx-auto grid max-w-md grid-cols-1 items-center justify-center gap-10 md:max-w-full md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
              <ItemBannerIcons items={data?.items as ItemProps[]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
