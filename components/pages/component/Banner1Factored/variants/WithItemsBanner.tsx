import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { BannerProps } from '../types';
import { BannerItem } from '../BannerItem';
import PTBanner, {
  type PTtype,
} from '@/components/pages/component/BannerWithItems/PTextBanner';
import PTItemBanner from '@/components/pages/component/BannerWithItems/PTextItemBanner';

export function WithItemsBanner({
  content,
  image,
  items,
  layout,
  PTextBanner,
  PTextItem,
}: BannerProps) {
  // Usamos el componente existente PTBanner
  const selectedComponent = PTextBanner
    ? PTBanner[PTextBanner as keyof PTtype]
    : PTBanner.PT1;

  const backgroundStyles =
    layout?.imagePosition === 'background' && image
      ? {
          backgroundImage: `url(${urlForImage(image)?.url()})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }
      : {};

  return (
    <div
      className={clsx(
        'relative z-20',
        layout?.imagePosition === 'background' ? 'z-0 h-full' : ''
      )}
      style={backgroundStyles}
    >
      {layout?.imagePosition === 'background' && (
        <div className="absolute inset-0 z-10 bg-white/80 dark:bg-black/80" />
      )}

      <div className="relative z-20 mx-auto flex flex-col items-center justify-center py-16">
        {content && (
          <div
            className={clsx(
              'mx-2 mb-12 md:mb-14',
              layout?.imagePosition === 'background' && 'text-white'
            )}
          >
            <PortableText
              value={content || []}
              components={selectedComponent}
            />
          </div>
        )}

        {items && (
          <div
            className={clsx(
              'mx-auto grid grid-cols-1 items-start justify-center dark:text-slate-300',
              'max-w-[650px] xs5:px-4',
              'lg:max-w-[1350px] lg:grid-cols-2'
            )}
          >
            {items.map((item, index) => (
              <BannerItem
                key={index}
                item={item}
                variant={layout?.variant}
                textStyle={PTextItem as keyof typeof PTItemBanner}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
