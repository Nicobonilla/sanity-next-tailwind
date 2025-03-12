'use client';

import { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

export default function ImageBg({
  imgBg,
  index
}: {
  imgBg: ComponentProps['imageBackground'];
  index: number
}) {
  const isPriority = index === 0;
  return (
    < Image
      src={urlForImage(imgBg)?.url() || '/meeting.jpeg'}
      alt={'alt'}
      sizes="100vw"
      fill
      className="absolute inset-0 object-cover"
      priority={isPriority}
    />
  );
}