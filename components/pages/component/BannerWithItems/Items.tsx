import { ItemProps, ItemsProps } from '@/components/types';
import ItemBanner from './ItemBanner';
import { type PTItemtype } from './PTextItemBanner';
import clsx from 'clsx';

const Items = ({
  items,
  PText,
  imagePosition,
}: {
  items: ItemsProps;
  PText: keyof PTItemtype;
  imagePosition: string;
}) => {
  if (!items) return null;

  return (
    <div
      className={clsx(
        'flex-1',
        {
          'lg:w-2/3': imagePosition === 'right' || imagePosition === 'left',
          'order-2': imagePosition === 'top' || imagePosition === 'left',
        },
        'grid max-w-full grid-cols-1 gap-6 md:grid-cols-2'
      )}
    >
      {items?.map(
        (item: ItemProps, index: number) =>
          item && (
            <ItemBanner
              key={index}
              item={item as ItemProps}
              PTextItem={PText as keyof PTItemtype}
            />
          )
      )}
    </div>
  );
};

export default Items;
