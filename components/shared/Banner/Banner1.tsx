import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getBannerDataFetch } from '@/sanity/lib/fetch';
import { GetBannerDataQueryResult } from '@/sanity.types';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';

// Definición de componentes para PortableText
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="h2 group relative">
        {' '}
        {/*text-4xl md:text-3xl lg:text-6xl*/}
        {children}
      </h2>
    ),
    normal: ({ children }) => <span>{children}</span>,
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-gray-300">{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="dark:text-gray-400">{children}</ul>
    ),
  },
};

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
    <div className="reverse relative flex h-[1000px] w-full flex-col items-center bg-gray-100 px-4 text-slate-700 md:h-[400px] md:flex-row md:justify-center lg:h-[500px] xl:h-[600px] 2xl:h-[700px] dark:text-slate-700">
      {/* Imagen */}
      <div className="relative mb-16 flex h-1/2 w-full flex-row md:mb-0 md:h-full md:w-1/3">
        <Image
          src={urlForImage(bannerData.image)?.url() || '/meeting.jpeg'}
          fill
          alt="Banner Image"
          className="object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="relative flex max-w-[470px] items-start justify-center md:items-start lg:max-w-full">
        <div className="prose px-5">
          <PortableText
            value={bannerData.content || []}
            components={components}
          />
        </div>
      </div>
    </div>
  );
}
