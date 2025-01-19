import item from '../../../../sanity/schemas/documents/item';
import { ItemProps, ItemsProps } from '../../PageTemplate';
import ItemBanner from './ItemBanner';
import { type PTItemtype } from './PTextItemBanner';

const Items = ({
  items,
  PText,
}: {
  items: ItemsProps;
  PText: keyof PTItemtype;
}) => {
  if (!items) return null;
  return items?.map(
    (item, index) =>
      item && (
        <ItemBanner
          key={index}
          item={item as ItemProps}
          PTextItem={PText as keyof PTItemtype}
        />
      )
  );
};

export default Items;
