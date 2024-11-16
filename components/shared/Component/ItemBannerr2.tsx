import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { Icon } from '@iconify/react';
import { Item } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

export type ItemProps = Omit<
  Item,
  '_id' | '_type' | '_key' | '_createdAt' | '_updatedAt' | '_rev'
>;

export const PTextItemBanner: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="h3 mx-auto mb-2 items-center justify-center md:max-w-[300px]">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="p3 text-justify md:max-w-[350px]">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

export default function ItemBanner({ item }: { item: ItemProps }) {
  if (!item) return null;

  const { icon, metadata } = item.icon || {};
  const hasSvgIcon = item.svgIcon;
  const hasImage = item.image;
  const hasContent = item.content;
  return (
    <div className="mb-10 flex flex-col items-center text-center md:mb-0">
      {/* Mostrar solo uno de los tipos, dependiendo de lo que esté disponible */}
      {icon && (
        <div className="relative z-0 mx-auto mb-5 flex items-center justify-center text-red-500 md:max-w-24">
          <Icon
            icon={icon}
            hFlip={metadata?.hFlip}
            vFlip={metadata?.vFlip}
            rotate={metadata?.rotate}
            width={metadata?.size?.width}
            height={metadata?.size?.height}
            style={{ color: metadata?.color?.hex }}
          />
        </div>
      )}

      {hasSvgIcon && !icon && (
        <div className="relative z-0 mx-auto mb-5 size-36 text-black">
          <div
            dangerouslySetInnerHTML={{ __html: item.svgIcon || '' }}
            aria-hidden="true"
          />
        </div>
      )}

      {hasImage && !icon && !hasSvgIcon && (
        <div className="relative flex h-[100px] w-full max-w-[100px] justify-center">
          <Image
            src={urlForImage(item?.image).url() || '/meeting.jpg'}
            alt={'Image'}
            fill
            className="relative z-10 object-contain"
          />
        </div>
      )}

      {hasContent && (
        <div className="mt-4">
          <PortableText
            value={item.content || []}
            components={PTextItemBanner} // Utilizamos el conjunto de componentes para el texto
          />
        </div>
      )}
    </div>
  );
}
