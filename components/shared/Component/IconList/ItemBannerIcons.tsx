import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { Icon } from '@iconify/react';
import { Item } from '@/sanity.types';

export type ItemProps = Omit<
  Item,
  '_id' | '_type' | '_key' | '_createdAt' | '_updatedAt' | '_rev'
>;

const PTextItemIcon: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="h3 mb-3">{children}</h1>,
    normal: ({ children }) => (
      <div className="p3 max-w-96 text-justify">
        <span>{children}</span>
      </div>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-bold text-red-500">{children}</span>
    ),
  },
};

export default function ItemBannerIcons({ items }: { items: ItemProps[] }) {
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  const ItemComponent: React.FC<ItemProps> = (item) => {
    if (!item) return null;

    const { icon, metadata } = item.icon || {};
    const hasSvgIcon = !!item.svgIcon;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative z-0 mx-auto mb-5 flex size-full items-center justify-center text-red-500 md:max-w-24">
          {icon ? (
            <Icon
              icon={icon}
              hFlip={metadata?.hFlip}
              vFlip={metadata?.vFlip}
              rotate={metadata?.rotate}
              width={metadata?.size?.width}
              height={metadata?.size?.height}
              style={{ color: metadata?.color?.hex }}
            />
          ) : (
            hasSvgIcon && (
              <div className="size-10 object-contain">
                <div
                  dangerouslySetInnerHTML={{ __html: item.svgIcon || '' }}
                  aria-hidden="true"
                />
              </div>
            )
          )}
        </div>
        <div>
          {item.content && (
            <PortableText
              value={item.content || []}
              components={PTextItemIcon}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {items.map(
        (item, index) => item && <ItemComponent key={index} {...item} />
      )}
    </>
  );
}
