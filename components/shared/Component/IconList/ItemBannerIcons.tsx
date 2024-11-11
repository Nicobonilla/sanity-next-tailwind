import React from 'react';
import { PortableText } from 'next-sanity';
import { PTextItemIcon } from '../../PortableText/PTextItemIcon';
import { Icon } from '@iconify/react';
import { Item } from '@/sanity.types';

export default function ItemBannerIcons({ items }: { items: Item[] }) {
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  const ItemComponent: React.FC<Item> = (item) => {
    if (!item) return null;

    const { icon, metadata } = item.icon || {};
    const hasSvgIcon = !!item.svgIcon;

    return (
      <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
        <div className="relative z-0 mx-auto mb-5 flex size-full items-center justify-center md:max-w-24">
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
        <div className="text-center md:text-start">
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
