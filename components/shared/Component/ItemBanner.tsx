import Image from 'next/image';
import { type Item } from '@/sanity/fetchs/pagesFetch';
import { urlForImage } from '@/sanity/lib/utils';

export default function ItemBanner({ items }: { items: Item[] | null }) {
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  const Item: React.FC<Item> = ({ image, title, description }: Item) => {
    return (
      <div className="mb-10 flex flex-col items-center text-center md:mb-0">
        <div className="relative flex h-[200px] w-full max-w-[380px] justify-center md:h-[160px] md:max-w-[300px] lg:h-[200px] lg:max-w-[300px]">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gray-200 to-transparent"></div>
          <Image
            src={urlForImage(image).url() || '/meeting.jpg'} // Fallback image if URL generation fails
            alt={title || 'Image'}
            fill
            className="relative z-10 object-contain p-2 md:pt-5"
          />
        </div>
        <h3 className="h3 mt-4 md:max-w-[280px]">{title || 'Title'}</h3>
        <p className="p3 mt-2 md:max-w-[300px]">
          {description || 'Description'}
        </p>
      </div>
    );
  };

  return (
    <>
      {items.map(
        (item, index) =>
          item && (
            <Item
              key={index}
              image={item.image}
              title={item.title || 'Title'}
              description={item.description || 'description'}
            />
          )
      )}
    </>
  );
}
