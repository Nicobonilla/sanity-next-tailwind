'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { getServiceBySlugFetch } from '@/sanity/lib/fetchs/service.fetch';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

import { type GetServiceDetailQueryResult } from '@/sanity.types';
import type { Service, WithContext } from 'schema-dts';
import { type Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service: GetServiceDetailQueryResult = await getData(params.slug);
  return {
    title: service?.title || '',
    description: service?.resumen || '',
    openGraph: {
      images: resolveOpenGraphImage(service?.components?.[0]?.imageBackground) || '',
    },
  };
}

async function getData(slug: string): Promise<GetServiceDetailQueryResult> {
  try {
    const service = await getServiceBySlugFetch(slug);
    return service;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const service = await getData(params?.slug);
  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service?.title || 'Abogados San Felipe',
    description: service.resumen || 'Derecho Familiar e Inmobiliario',
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

  const breadcrumbsItems = [
    { label: 'Inicio', href: '/', slug: 'home' }, // Level 1: Root
    {
      label: service.unitBusiness.title,
      slug: `area-de-practica/${service.unitBusiness.slug}`,
    },
  ];
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={'mx-auto'}>
        {service?.components && (
          <PageTemplate components={service.components} />
        )}
        <PortableTextAndToc
          article={service}
          breadcrumbsItems={breadcrumbsItems}
        />
      </div>
    </section>
  );
}
