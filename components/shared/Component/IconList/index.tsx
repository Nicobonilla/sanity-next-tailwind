import React from 'react';
import { BannerData } from '@/sanity/fetchs/bannerFetch';
import { Item } from '@/sanity/fetchs/pagesFetch';
import ItemBannerIcons from './ItemBannerIcons';

export default function IconList({ data }: { data: BannerData }) {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-screen-lg">
        {data.title && (
          <h2 className="h2 mb-12 text-center md:mb-20">{data.title}</h2>
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
