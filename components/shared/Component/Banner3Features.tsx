import React from 'react';
import ItemBanner from '@/components/shared/Component/ItemBanner';
import { Item } from '@/sanity/fetchs/pagesFetch';
import { PortableText } from 'next-sanity';
import { PTextBanner3Features } from '../PortableText/PTextBanner3Features';
import { Banner } from '@/sanity.types';

export default function Banner3Features({ data }: { data: Banner }) {
  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center px-4 py-8 md:max-w-screen-xl">
      {data.content && (
        <PortableText
          value={data.content || []}
          components={PTextBanner3Features}
        />
      )}

      {data.items && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-1">
          <ItemBanner items={data.items as Item[]} />
        </div>
      )}
    </div>
  );
}
