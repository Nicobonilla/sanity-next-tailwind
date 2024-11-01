import React from 'react';
import Image from 'next/image';
import Icon from '@/components/shared/Icon';
import type { Item } from '@/sanity/fetchs/pagesFetch';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export default function ItemBannerIcons({ items }: { items: Item[] | null }) {
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }
  const styleIcon = {
    size: 80,
    color: '#ef4444',
    strokeWidth: 1,
  };

  const Item: React.FC<Item> = (item: Item) => {
    const sizeHole = styleIcon.size + 25;
    if (!item?.iconValue) {
      console.log('iconValue', item?.iconValue);
      return <h1> SIN ICON</h1>;
    }
    const iconName =
      (item.iconValue as keyof typeof dynamicIconImports) || 'sun';

    return (
      <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
        <div className="relative z-0 mb-5 flex h-full w-full items-center justify-center md:max-w-24">
          <div className="absolute bottom-0 z-20 -translate-y-2 translate-x-2">
            <Icon
              name={iconName}
              className="md:w-12"
              size={styleIcon.size}
              color={styleIcon.color}
              strokeWidth={styleIcon.strokeWidth}
            />
          </div>
          <Image
            src={'/gray.svg'}
            className="md:w-20"
            width={sizeHole}
            height={sizeHole}
            alt="follow-me"
          />
        </div>
        <div className="text-center md:text-start">
          <h3 className="h3 mb-3">{item?.title}</h3>
          <p className="p3">{item?.description}</p>
        </div>
      </div>
    );
  };
  return (
    <>{items.map((item, index) => item && <Item key={index} {...item} />)}</>
  );
}
