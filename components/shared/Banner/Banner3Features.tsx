import React from 'react';
import ItemBanner from '@/components/shared/Banner/ItemBanner';
import { Component } from '@/sanity/fetchs/pagesFetch';

export default function Banner3Features({ data }: { data: Component }) {
  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }

  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center px-4 py-8 md:max-w-screen-xl">
      <h2 className="h2 mb-6 text-center uppercase">
        {data[0].title || 'Title'}
      </h2>
      <p className="p2 mb-10 w-full text-center md:w-3/4">
        {data[0].description || 'Description'}
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-1">
        {data &&
          data?.map(
            (component, index) =>
              component.items && (
                <ItemBanner key={index} items={component.items} />
              )
          )}
      </div>
    </div>
  );
}
