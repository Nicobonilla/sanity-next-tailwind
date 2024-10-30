import { ItemData } from '@/sanity/fetchs/bannerFetch';
import Image from 'next/image';
import { urlForImage } from '../../../sanity/lib/utils';

interface ItemBannerProps {
  items: Array<ItemData>;
}

export default function ItemBanner({ items }: ItemBannerProps) {
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  return (
    <>
      {items != null &&
        items.map((item, index) => (
          <div
            key={index}
            className="mb-10 flex flex-col items-center text-center md:mb-0"
          >
            <div className="relative flex h-[200px] w-full max-w-[380px] justify-center md:h-[160px] md:max-w-[300px] lg:h-[200px] lg:max-w-[300px]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gray-200 to-transparent"></div>
              {item ? (
                <Image
                  src={urlForImage(item.image)?.url() || '/meeting.jpeg'}
                  alt={item.title || 'Image'}
                  fill
                  className="relative z-10 object-contain p-2 md:pt-5"
                />
              ) : (
                <div> Image not found </div>
              )}
            </div>
            <h3 className="h3 mt-4 md:max-w-[280px]">
              {item ? item?.title : 'Title'}
            </h3>
            <p className="p3 mt-2 md:max-w-[300px]">
              {item.description || 'Description'}
            </p>
          </div>
        ))}
    </>
  );
}
