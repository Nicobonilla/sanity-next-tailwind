import { PortableText } from 'next-sanity';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { ItemProps } from '@/components/pages/PageTemplate';
import ItemBanner from './ItemBanner';
import clsx from 'clsx';
import PTextBanner, { type PTBannerType } from './PTextBanner';
import { type PTItemtype } from './PTextItemBanner';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';

export default function Inner({ data }: { data: ComponentProps }) {
  return (
    <div
      className={clsx(
        'relative z-20 mx-auto h-fit px-3 pt-16 lg:max-w-screen-xl lg:pb-16',
        { 'pb-16': data.imagePosition === 'top' }
      )}
    >
      {/* Title and Premise Section */}
      {data.content && (
        <div
          className={clsx(
            'mb-12 flex flex-col items-center justify-center gap-8 text-center md:mb-14 md:flex-row md:gap-0',
            data.backgroundMode == 'image' && 'text-white'
          )}
        >
          <PortableText
            value={data.content || []}
            components={
              PTextBanner
                ? PTextBanner[data?.PTextBanner as keyof PTBannerType]
                : PTextBanner['PT1']
            }
          />
        </div>
      )}

      {/* Responsive Image */}
      <div
        className={clsx('relative flex flex-col gap-6', {
          'lg:flex-row':
            data.imagePosition === 'right' || data.imagePosition === 'left',
        })}
      >
        {/* Items Section */}
        <div
          className={clsx(
            'flex-1',
            {
              'lg:w-2/3':
                data.imagePosition === 'right' || data.imagePosition === 'left',
              'order-2':
                data.imagePosition === 'top' || data.imagePosition === 'left',
            },
            'grid max-w-full grid-cols-1 gap-6'
          )}
        >
          {data?.items?.map(
            (item, index) =>
              item && (
                <ItemBanner
                  key={index}
                  item={item as ItemProps}
                  PTextItem={data?.PTextItem as keyof PTItemtype}
                />
              )
          )}
        </div>

        {/* Image Section */}
        {data.image && (
          <div
            className={clsx('relative z-50 h-96 w-full lg:h-auto', {
              'lg:w-1/3':
                data.imagePosition === 'right' || data.imagePosition === 'left',
            })}
          >
            <Image
              src={urlForImage(data.image)?.url()}
              fill
              alt="Banner Image"
              className="overflow-hidden object-cover object-top"
            />
          </div>
        )}
      </div>
    </div>
  );
}
