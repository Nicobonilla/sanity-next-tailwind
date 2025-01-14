import clsx from 'clsx';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import PTBanner, { type PTBannerType } from '../BannerWithItems/PTextBanner';
import { ComponentProps } from '@/components/pages/PageTemplate';

export default function Banner1({ data }: { data: ComponentProps }) {
  const {
    PTextBanner,
    content,
    image,
    invertLayoutMobile,
    invertLayoutDesk,
    responsiveComponent,
  } = data;

  if (data) {
    return (
      <div
        className={clsx(
          'relative mx-auto my-20 flex items-center gap-8 px-4',
          invertLayoutMobile ? 'flex-col' : 'flex-col-reverse',
          'md:justify-between',
          invertLayoutDesk ? 'md:flex-row' : 'md:flex-row-reverse',
          'lg:max-w-screen-xl',
        )}
      >
        {/* Imagen */}
        <div className="responsive-image-1 relative">
          <Image
            src={urlForImage(image)?.url() || '/meeting.jpeg'}
            fill
            alt="Banner Image"
            className="object-contain"
          />
        </div>
        {/* Contenido */}
        <div className="">
          <div className="relative flex max-w-[470px] flex-col items-start justify-center space-y-4">
            <PortableText
              value={content || []}
              components={
                PTextBanner
                  ? PTBanner[PTextBanner as keyof PTBannerType]
                  : PTBanner.PT1
              }
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Error al cargar el banner.</div>;
  }
}
