import { PortableText } from 'next-sanity';
import { ComponentProps } from '@/components/types';
import clsx from 'clsx';
import PTextBanner, { type PTBannerType } from './PTextBanner';
import { urlForImage } from '@/sanity/lib/utils';
import Items from './Items';
import { PTItemtype } from './PTextItemBanner';
import ImageItem from './Image';

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

      <div
        className={clsx('relative flex flex-col gap-6 bg-red-500', {
          'lg:flex-row':
            data.imagePosition === 'right' || data.imagePosition === 'left',
        })}
      >
        <Items
          items={data.items}
          PText={data.PTextItem as keyof PTItemtype}
          imagePosition={data.imagePosition}
        />
        <ImageItem
          src={urlForImage(data.image)?.url()}
          imagePosition={data.imagePosition}
        />
      </div>
    </div>
  );
}
