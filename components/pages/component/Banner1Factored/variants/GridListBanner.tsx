import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { BannerProps } from '../types';
import PTBanner from '@/components/pages/component/BannerWithItems/PTextBanner';

export function GridListBanner({
  content,
  image,
  layout,
  PTextBanner: textStyle,
}: BannerProps) {
  const selectedComponent = textStyle ? PTBanner[textStyle] : PTBanner.PT1;

  const backgroundStyles =
    layout?.imagePosition === 'background' && image
      ? {
          backgroundImage: `url(${urlForImage(image)?.url()})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed', // Mantenemos el efecto parallax
        }
      : {};

  return (
    <div
      className={clsx(
        'relative w-full',
        'min-h-screen xs5:min-h-fit md:h-[800px]'
      )}
    >
      <div
        className={clsx(
          'z-0 h-full',
          layout?.imagePosition === 'background' &&
            'bg-cover bg-fixed bg-center'
        )}
        style={backgroundStyles}
      >
        {layout?.imagePosition === 'background' && (
          <div className="absolute inset-0 z-10 max-h-fit" />
        )}

        <div
          className={clsx(
            'relative z-20 mx-auto flex flex-col items-center justify-center',
            layout?.imagePosition === 'background'
              ? 'lg:max-w-none'
              : 'lg:max-w-screen-xl'
          )}
        >
          {content && (
            <div
              className={clsx(
                'grid h-fit w-full grid-cols-1 place-content-center justify-center dark:text-slate-300',
                'xs4:grid-cols-2',
                'xs5:px-4',
                'sm:grid-cols-3',
                'md:grid-cols-4',
                'lg:h-[800px] lg:max-w-[1350px] lg:grid-cols-5'
              )}
            >
              {content.map(
                (line: any, indexItem: number) =>
                  line?.children?.[0].text && (
                    <div
                      key={indexItem}
                      className={clsx(
                        'group relative h-20 cursor-pointer place-content-center overflow-hidden bg-white/70 p-2 dark:bg-black/70 sm:h-24'
                      )}
                    >
                      {line?.children?.[0].text
                        .split(':')
                        .map((text: string, indexContent: number) => (
                          <h1
                            key={indexContent}
                            className={clsx(
                              'absolute w-full text-center font-extrabold leading-5 transition-transform duration-500 ease-in-out',
                              {
                                'group-hover:translate-x-full group-hover:opacity-0':
                                  indexContent === 0,
                                'translate-x-[-100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100':
                                  indexContent === 1,
                              }
                            )}
                          >
                            {text}
                          </h1>
                        ))}
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
