import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getBannerDataFetch } from '@/sanity/lib/fetch';
import { GetBannerDataQueryResult } from '@/sanity.types';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PTextBanner } from '../PortableText/PTextBanner';
  
export default async function Banner1() {
  
  let banner: GetBannerDataQueryResult | null = null;

  try {
    const fetchedData = await getBannerDataFetch();
    if (
      fetchedData !== null &&
      Array.isArray(fetchedData) &&
      fetchedData.length > 0
    ) {
      banner = fetchedData; // Asignar el primer elemento si los datos existen
    } else {
      console.error('Los datos obtenidos son nulos o no válidos');
    }
  } catch (error) {
    console.error('Error al obtener los datos del banner:', error);
  }

  if (!banner) {
    return <div>Error al cargar el banner.</div>;
  }

  const bannerData = banner[0];

  return (
    <div className="relative flex h-[900px] w-full flex-col-reverse items-center px-4 md:h-[400px] md:flex-row md:justify-center lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      {/* Imagen */}
      <div className="relative flex h-full w-full flex-row md:mb-0 md:h-full md:w-1/3">
        <Image
          src={urlForImage(bannerData.image)?.url() || '/meeting.jpeg'}
          fill
          alt="Banner Image"
          className="object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="lg:max-w-1/3 relative flex max-w-[470px] flex-col items-start justify-center">
        <PortableText
          value={bannerData.content || []}
          components={PTextBanner}
        />
      </div>
    </div>
  );
}
