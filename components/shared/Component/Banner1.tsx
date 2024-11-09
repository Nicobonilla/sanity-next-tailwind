import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { PTextBanner } from '../PortableText/PTextBanner';
import { BannerData } from '@/sanity/fetchs/bannerFetch';

export default async function Banner1({ data }: { data: BannerData | null }) {
  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }
  return (
    <div
      className={`responsive-1 relative ${data.invertLayoutMobile ? 'flex-col' : 'flex-col-reverse'} flex items-center gap-4 px-4 md:${data.invertLayoutDesk ? 'flex-row' : 'flex-row-reverse'} md:justify-center`}
    >
      {/* Imagen */}
      <div className="responsive-image-1 relative flex flex-row md:mb-0">
        <Image
          src={urlForImage(data.image)?.url() || '/meeting.jpeg'}
          fill
          alt="Banner Image"
          className="object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="lg:max-w-1/3 relative flex max-w-[470px] flex-col items-start justify-center">
        <PortableText value={data.content || []} components={PTextBanner} />
      </div>
    </div>
  );
}
