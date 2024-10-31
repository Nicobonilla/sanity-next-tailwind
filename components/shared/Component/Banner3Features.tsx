import React from 'react';
import ItemBanner from '@/components/shared/Component/ItemBanner';
import { BannerData } from '@/sanity/fetchs/bannerFetch';
import { Item } from '@/sanity/fetchs/pagesFetch';

export default function Banner3Features({ data }: { data: BannerData }) {
  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center px-4 py-8 md:max-w-screen-xl">
      {data.title && (
        <h2 className="h2 mb-6 text-center uppercase">
          {data.title || 'Title'}
        </h2>
      )}

      {data?.description && (
        <h2 className="h2 mb-6 text-center uppercase">
          {data.description || 'Description'}
        </h2>
      )}

      {data.items && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-1">
          <ItemBanner items={data.items as Item[]} />
        </div>
      )}
    </div>
  );
}
