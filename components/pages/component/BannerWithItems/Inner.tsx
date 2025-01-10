import { PortableText } from 'next-sanity';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { ItemProps } from '@/components/pages/PageTemplate';
import ItemBanner from './ItemBanner';
import clsx from 'clsx';
import PTextBanner, { type PTBannerType } from './PTextBanner';
import PTItemBanner, { type PTItemtype } from './PTextItemBanner';

export default function Inner({ data }: { data: ComponentProps }) {
  return (
    <div
      className={clsx(
        'relative z-20 mx-auto flex flex-col items-center justify-center px-3 py-16',
        data.imagePosition == 'background'
          ? 'lg:max-w-none'
          : 'lg:max-w-screen-xl'
      )}
    >
      {data.content && (
        <div
          className={clsx(
            'mx-2 mb-12 md:mb-14',
            data.imagePosition == 'background' && 'text-white'
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

      {data?.items && (
        <div
          className={clsx(
            'mx-auto grid grid-cols-1 items-start justify-center dark:text-slate-300',
            'max-w-[650px] xs5:px-4',
            'lg:max-w-[1050px] lg:grid-cols-2'
          )}
        >
          {data.items.map(
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
      )}
    </div>
  );
}
