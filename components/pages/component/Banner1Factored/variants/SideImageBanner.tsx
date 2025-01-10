import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';
import clsx from 'clsx';
import { BannerProps } from '../types';
import PTBanner from '@/components/pages/component/BannerWithItems/PTextBanner';

export function SideImageBanner({
  content,
  image,
  layout,
  PTextBanner: textStyle,
  responsiveComponent,
}: BannerProps) {
  const selectedComponent = textStyle ? PTBanner[textStyle] : PTBanner.PT1;

  return (
    <div
      className={clsx(
        'flex items-center gap-4 px-4',
        responsiveComponent ? 'responsive-banner-1' : 'responsive-banner-1',
        layout?.invertMobile ? 'flex-col' : 'flex-col-reverse',
        layout?.invertDesktop ? 'md:flex-row' : 'md:flex-row-reverse',
        'md:justify-center'
      )}
    >
      <div className="responsive-image-1 relative flex h-3/5 flex-row md:mb-0">
        <Image
          src={urlForImage(image)?.url() || '/meeting.jpeg'}
          fill
          alt="Banner Image"
          className="object-contain"
        />
      </div>
      <div className="lg:max-w-1/3 relative flex max-w-[470px] flex-col items-start justify-center">
        <PortableText value={content || []} components={selectedComponent} />
      </div>
    </div>
  );
}
