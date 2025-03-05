import { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

export default function ImageBg({
  imgBg,
  imgBgType,
  index,
}: {
  imgBg: ComponentProps['imageBackground'];
  imgBgType: ComponentProps['backgroundValue']['imageBackgroundType'];
  index?: number;
}) {
  const priority = index === 0;
  return (
    <>
      {imgBg && imgBgType === 'dynamic' && (
        <Image
          src={urlForImage(imgBg)?.url() || '/meeting.jpeg'}
          alt="Hero image for the homepage"
          className="inset-0 z-10 size-full object-cover object-center"
          quality={70}
          fill
          priority={priority}
        />
      )}

      {imgBg && imgBgType === 'fixed' && (
        <div
          className="absolute inset-0 z-10 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: `url(${urlForImage(imgBg)?.url() || ''})`,
          }}
        />
      )}
    </>
  );
}
