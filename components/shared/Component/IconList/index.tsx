import React from 'react';
import { Item } from '@/sanity/fetchs/pagesFetch';
import ItemBannerIcons from './ItemBannerIcons';
import { Banner } from '@/sanity.types';
import { PortableText } from 'next-sanity';
import { PTextBanner } from '../../PortableText/PTextBanner';

export default function IconList({ data }: { data: Banner }) {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-screen-lg">
        {data.content && (
          <div className="h2 mb-12 text-center md:mb-20">
            <PortableText value={data.content || []} components={PTextBanner} />
          </div>
        )}
        {data.items && (
          <div className="mx-auto grid max-w-md grid-cols-1 items-center justify-center gap-10 md:max-w-full md:grid-cols-2 md:gap-5">
            <ItemBannerIcons items={data.items as Item[]} />
          </div>
        )}
      </div>
    </div>
  );
}
