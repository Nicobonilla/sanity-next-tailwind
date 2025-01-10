import clsx from 'clsx';
import { BannerItem } from './BannerItem';
import { useMemo } from 'react';

interface BannerItemsProps {
  items: any[];
  variant: string;
  layout: string;
  textStyle: string;
}

export function BannerItems({
  items,
  variant,
  layout,
  textStyle,
}: BannerItemsProps) {
  const gridStyles = useMemo(() => {
    if (variant === 'gridList') {
      return clsx(
        'grid grid-cols-1 place-content-center justify-center',
        'xs4:grid-cols-2',
        'sm:grid-cols-3',
        'md:grid-cols-4',
        'lg:h-[800px] lg:grid-cols-5'
      );
    }

    return clsx(
      'grid grid-cols-1',
      'xs5:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      'gap-6'
    );
  }, [variant]);

  return (
    <div className={clsx('w-full px-4', gridStyles)}>
      {items.map((item, index) => (
        <BannerItem
          key={index}
          item={item}
          variant={variant}
          PTextItem={textStyle}
        />
      ))}
    </div>
  );
}
