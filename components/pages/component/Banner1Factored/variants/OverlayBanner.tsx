import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';
import clsx from 'clsx';
import { BannerProps } from '../types';
import PTBanner from '@/components/pages/component/BannerWithItems/PTextBanner';

export function OverlayBanner({
  content,
  image,
  PTextBanner: textStyle,
}: BannerProps) {
  const selectedComponent = textStyle ? PTBanner[textStyle] : PTBanner.PT1;

  return (
    <>
      <Image
        src={urlForImage(image)?.url() || '/meeting.jpeg'}
        alt="Banner image"
        className="object-cover object-bottom md:object-center"
        quality={100}
        fill
      />
      <div
        className={clsx(
          'absolute inset-x-0 top-0 z-0 h-fit bg-blue-900 xs5:py-5',
          'shadow-2xl md:left-auto md:right-0 md:top-10 md:w-2/5'
        )}
      >
        <div
          className={clsx(
            'relative z-10 mx-auto max-w-md items-center justify-center p-5 dark:text-slate-200',
            'md:mx-0 md:md:p-2'
          )}
        >
          <div className="my-auto w-full flex-col items-center justify-center pr-5 text-right md:mt-5">
            <PortableText
              value={content || []}
              components={selectedComponent}
            />
          </div>
        </div>
      </div>
    </>
  );
}
