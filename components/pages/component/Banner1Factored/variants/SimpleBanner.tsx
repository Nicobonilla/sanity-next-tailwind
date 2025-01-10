import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { BannerProps } from '../types';
import PTBanner from '@/components/pages/component/BannerWithItems/PTextBanner';

export function SimpleBanner({
  content,
  image,
  PTextBanner: textStyle,
}: BannerProps) {
  const selectedComponent = textStyle ? PTBanner[textStyle] : PTBanner.PT1;

  return (
    <div className="relative h-[400px] w-full lg:h-[200px]">
      <div
        className="z-0 h-full bg-cover bg-fixed bg-center" // Mantenemos bg-fixed para parallax
        style={{
          backgroundImage: `url(${urlForImage(image)?.url() || '/meeting.jpeg'})`,
        }}
      >
        <div className="relative inset-0 z-20 my-auto flex h-full flex-col justify-center text-center text-white shadow-lg">
          <PortableText value={content || []} components={selectedComponent} />
          <div className="absolute inset-0 -z-10 bg-red-500/60"></div>
        </div>
      </div>
    </div>
  );
}
