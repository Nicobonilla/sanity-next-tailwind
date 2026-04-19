import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Service, WithContext } from 'schema-dts';

import PageTemplate from '@/components/pages/PageTemplate';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { ComponentsProps } from '@/components/types';
import { buildSeoMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getServiceBySlugFetch } from '@/sanity/lib/fetchs/service.fetch';
import {
  GetServiceDetailQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';

async function getData(slug: string) {
  try {
    const [service, settings]: [
      GetServiceDetailQueryResult,
      SettingsQueryResult,
    ] = await Promise.all([getServiceBySlugFetch(slug), getSettingsFetch()]);

    return { service, settings };
  } catch (error) {
    console.error('Error fetching service detail:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);

  if (!data?.service) {
    return {
      title: 'Servicio no encontrado',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSeoMetadata({
    title: data.service.title,
    description: data.service.resumen,
    path: `/services/${params.slug}`,
    seo: data.service.seo,
    settings: data.settings,
    fallbackImage: data.service.components?.[0]?.imageBackground,
    type: 'website',
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data?.service) {
    notFound();
  }

  const { service, settings } = data;

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title || 'Abogados San Felipe',
    description: service.resumen || siteConfig.descriptor,
    serviceType: 'Asesoria legal y juridica',
    provider: {
      '@type': 'Organization',
      name: siteConfig.firmName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        addressCountry: 'CL',
      },
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
      url: 'https://www.abogadossanfelipe.cl',
    },
    areaServed: `${siteConfig.city}, Chile`,
    offers: {
      '@type': 'Offer',
      price: 'Consultar',
      priceCurrency: 'CLP',
    },
  };

  const breadcrumbsItems = [
    { label: 'Inicio', slug: 'home' },
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
      <div className="mx-auto">
        {service.components && (
          <PageTemplate components={service.components as ComponentsProps} />
        )}
        <PortableTextAndToc
          article={service}
          breadcrumbsItems={breadcrumbsItems}
          cta={service.contentCta || settings?.defaultContentCta}
          ctaSource={`service_${params.slug}`}
        />
      </div>
    </section>
  );
}
