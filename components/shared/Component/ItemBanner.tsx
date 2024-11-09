import Image from 'next/image';
import { type Item } from '@/sanity/fetchs/pagesFetch';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from 'next-sanity';
import { PTextBannerItem } from '../PortableText/PTextBannerItem';

export default function ItemBanner({ items }: { items: Item[] | null }) {
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  const Item: React.FC<Item> = (item: Item) => {
    return (
      <div className="mb-10 flex flex-col items-center text-center md:mb-0">
        <div className="relative flex h-[75px] w-full max-w-[150px] justify-center">
          {false && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gray-200 to-transparent"></div>
          )}
          <Image
            src={urlForImage(item?.image).url() || '/meeting.jpg'} // Fallback image if URL generation fails
            alt={'Image'}
            fill
            className="relative z-10 object-contain p-2 md:pt-5"
          />
        </div>
        {item?.content && (
          <PortableText
            value={item.content || []}
            components={PTextBannerItem}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {items.map(
        (item, index) =>
          item && <Item key={index} image={item.image} content={item.content} />
      )}
    </>
  );
}
