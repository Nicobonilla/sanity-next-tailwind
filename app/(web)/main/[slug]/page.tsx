import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getPagesFetch } from '@/sanity/lib/fetch';
import { Metadata } from 'next';
import { TableOfContents } from '@/components/pages/services/TableOfContents';
import { GetPagesQueryResult } from '@/sanity.types';
import { PTServices } from '@/components/shared/PortableText/PTServices';
import Banner from '@/components/shared/Banner/Banner1';
import type { Banner as BannerType } from '@/sanity.types';

export default async function Page({ params }: { params: { slug: string } }) {
  let page: GetPagesQueryResult | null = null;

  try {
    const fetchedData = await getPagesFetch();
    if (
      fetchedData !== null &&
      Array.isArray(fetchedData) &&
      fetchedData.length > 0
    ) {
      page = fetchedData; // Asignar el primer elemento si los datos existen
    } else {
      console.error('Los datos obtenidos son nulos o no válidos');
    }
  } catch (error) {
    console.error('Error al obtener los datos del banner:', error);
  }

  if (!page) {
    return <div>Error al cargar el banner.</div>;
  }

  return (
    <article>
      <h1 className="h2 mb-6">{page[0].title}</h1>

      <div className="flex flex-col gap-14 md:flex-row">
        {/* Main Content: Ensure main content is on the left */}
        <div className="order-2 md:order-1 md:w-3/4">
          <div className="prose prose-sm max-w-none">
            <PortableText value={page[0].content || []} components={{}} />
          </div>
        </div>
      </div>
    </article>
  );
}
