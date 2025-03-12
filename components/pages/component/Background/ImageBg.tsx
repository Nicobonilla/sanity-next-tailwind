'use client'
import { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';

export default function ImageBg({
  imgBg,
  imgBgType,
}: {
  imgBg: ComponentProps['imageBackground'];
  imgBgType: ComponentProps['backgroundValue']['imageBackgroundType'];
}) {

  return (
    <>
        <div 
          className={clsx(
            "absolute inset-0 size-full",
            "bg-cover bg-center bg-no-repeat",
            {
              'bg-fixed': imgBgType === 'fixed',
            }
          )}
          style={{
            backgroundImage: `url(${urlForImage(imgBg).url()})`
          }}
        />
    </>
  );
}
