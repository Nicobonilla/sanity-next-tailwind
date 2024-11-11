import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { PTextBanner } from '../PortableText/PTextBanner';
import { Banner } from '@/sanity.types';

export default function Banner1({ data }: { data: Banner | null }) {
  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }
  return (
    <div
      className={`responsive-banner-1 relative flex items-center gap-4 px-4 ${data.invertLayoutMobile ? 'flex-col' : 'flex-col-reverse'} md:${data.invertLayoutDesk ? 'flex-row' : 'flex-row-reverse'} md:justify-center`}
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
