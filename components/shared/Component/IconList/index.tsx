import React from 'react';
import { Item } from '@/sanity/fetchs/pagesFetch';
import ItemBannerIcons from './ItemBannerIcons';
import { Banner } from '@/sanity.types';
import { PortableText } from 'next-sanity';
import { PTextBannerIcons } from '../../PortableText/PTextBannerIcons';

export default function IconList({ data }: { data: Banner }) {
  if (!data?.items) {
    return <p>No data available</p>;
  }
  return (
    <div className="mx-auto max-w-screen-lg">
      {data.content && (
        <div className="h2 mb-12 text-center md:mb-20">
          <PortableText
            value={data.content || []}
            components={PTextBannerIcons}
          />
        </div>
      )}
      {data?.items && (
        <div className="mx-auto grid max-w-md grid-cols-1 items-center justify-center gap-10 md:max-w-full md:grid-cols-2 md:gap-5">
          <ItemBannerIcons items={data?.items as Item[]} />
        </div>
      )}
    </div>
  );
}
