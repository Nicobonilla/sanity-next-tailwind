import React from 'react';
import ItemBanner from '@/components/shared/Banner/ItemBanner';
import type { BannerData, ItemData } from '@/sanity/fetchs/bannerFetch';

export default function Banner3Features({ data }: { data: BannerData }) {
  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }

  if (data.typeComponent !== 'banner3Features') {
    return <div>Banner no es de tipo 3Features</div>;
  }

  if (!data.items || data.items.length === 0 || data.items === null) {
    return <p>No items available</p>;
  }

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center px-4 py-8 md:max-w-screen-xl">
      <h2 className="h2 mb-6 text-center uppercase">{data.title || 'Title'}</h2>
      <p className="p2 mb-10 w-full text-center md:w-3/4">
        {data.description || 'Description'}
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-1">
        <ItemBanner items={data.items as ItemData} />
      </div>
    </div>
  );
}
