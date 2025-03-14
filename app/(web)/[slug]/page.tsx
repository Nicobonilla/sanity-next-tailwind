import PageTemplate from '@/components/pages/PageTemplate';
import { extractKeywords } from '@/components/utils';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { type ComponentProps } from '@/components/types';
import type { GetPageDetailQueryResult, SettingsQueryResult } from '@/sanity.types';
import type { Service, WithContext } from 'schema-dts';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);

  if (!data) {
    return {
      title: "Página no encontrada",
    };
  }

  const { page } = data;

  return {
    title: page?.title || "",
    keywords: extractKeywords((page?.content as ComponentProps["content"])),
  };
}

async function getData(slug: string) {
  try {
    const [page, settings]: [GetPageDetailQueryResult, SettingsQueryResult] =
      await Promise.all([getPageBySlugFetch(slug), getSettingsFetch()]);
    return { page, settings };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  if (params?.slug == 'contacto') {
    return redirect('/');
  }
  const data = await getData(params?.slug);
  if (!data) {
    return <div>Página no encontrada.</div>;
  }
  const { page } = data;

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page?.title || 'Abogados San Felipe',
    description: 'Derecho Familiar e Inmobiliario',
    serviceType: 'Asesoría Legal y Jurídica',
    provider: {
      '@type': 'Organization',
      name: 'Abogados San Felipe - Sebastián Bonilla Marín',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Felipe',
        addressRegion: 'Valparaíso',
        postalCode: '2170000',
        addressCountry: 'CL',
      },
      telephone: '+56 9 3359 6955',
      email: 'contacto@abogadossanfelipe.cl',
      url: 'https://www.abogadossanfelipe.cl',
    },
    areaServed: 'San Felipe, Chile',
    offers: {
      '@type': 'Offer',
      price: 'Consultar',
      priceCurrency: 'CLP',
    },
  };

  if (!page) {
    return <div>Pagina no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {page?.components ? (
        <PageTemplate components={page.components} />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </section>
  );
}
