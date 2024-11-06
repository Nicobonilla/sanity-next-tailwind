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
      className={`relative ${data.invertLayoutMobile ? 'flex-col' : 'flex-col-reverse'} flex h-[700px] w-full items-center px-4 md:h-[400px] md:${data.invertLayoutDesk ? 'flex-row' : 'flex-row-reverse'} md:justify-center lg:h-[500px] xl:h-[600px] 2xl:h-[700px]`}
    >
      {/* Imagen */}
      <div className="relative flex h-1/2 w-full flex-row md:mb-0 md:h-full md:w-1/3">
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
