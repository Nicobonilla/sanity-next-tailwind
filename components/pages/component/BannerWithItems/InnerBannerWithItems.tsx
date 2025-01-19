import { PortableText } from 'next-sanity';
import { ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';
import PTextBanner, { type PTBannerType } from './PTextBanner';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import Items from './Items';
import { PTItemtype } from './PTextItemBanner';

export default function InnerBannerWithItems({
  data,
}: {
  data: ComponentProps;
}) {
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
            'flex flex-col items-center justify-center text-center md:mb-14 md:flex-row md:gap-0',
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
        className={clsx('relative flex flex-col gap-6 bg-red-500', {
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
            'grid max-w-full grid-cols-1 gap-6 md:grid-cols-2'
          )}
        >
          <Items
            items={data.items}
            PText={data.PTextItem as keyof PTItemtype}
          />
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
              className="overflow-hidden object-cover object-top lg:overflow-visible"
            />
          </div>
        )}
      </div>
    </div>
  );
}
