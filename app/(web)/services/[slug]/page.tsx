import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Service, WithContext } from 'schema-dts';

import ServiceLandingSections from '@/components/content/ServiceLandingSections';
import PageTemplate from '@/components/pages/PageTemplate';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { ComponentsProps } from '@/components/types';
import ServiceQuickActions from '@/components/content/ServiceQuickActions';
import { normalizePathSegment } from '@/lib/path-utils';
import { buildSeoMetadata, extractFallbackImage } from '@/lib/seo';
import { resolveSiteIdentity } from '@/lib/site-identity';
import { buildFaqJsonLd } from '@/lib/structured-data';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import {
  getServiceBySlugFetch,
  getServicesNavFetch,
} from '@/sanity/lib/fetchs/service.fetch';
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServicesNavFetch();

  return (services || [])
    .filter((service) => Boolean(normalizePathSegment(service.slug)))
    .map((service) => ({
      slug: normalizePathSegment(service.slug)!,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);

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
    path: `/services/${slug}`,
    seo: data.service.seo,
    settings: data.settings,
    fallbackImage: extractFallbackImage(data.service.components),
    type: 'website',
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.service) {
    notFound();
  }

  const { service, settings } = data;
  const siteIdentity = resolveSiteIdentity(settings);

  const jsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title || 'Abogados San Felipe',
    description: service.resumen || siteIdentity.descriptor,
    serviceType: 'Asesoria legal y juridica',
    provider: {
      '@type': 'Organization',
      name: siteIdentity.firmName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteIdentity.city,
        addressRegion: siteIdentity.region,
        addressCountry: 'CL',
      },
      telephone: siteIdentity.phoneDisplay,
      email: siteIdentity.email,
      url: 'https://www.abogadossanfelipe.cl',
    },
    areaServed: `${siteIdentity.city}, Chile`,
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
  const faqJsonLd =
    service.landing?.faqItems?.length
      ? buildFaqJsonLd(
          service.landing.faqItems
            .filter((item) => item?.question && item?.answer)
            .map((item) => ({
              question: item.question!,
              answer: item.answer!,
            }))
        )
      : null;

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <div className="mx-auto">
        {service.components && (
          <PageTemplate components={service.components as ComponentsProps} />
        )}
        <ServiceQuickActions
          practiceAreaTitle={service.unitBusiness?.title}
          serviceSummary={service.resumen}
          serviceTitle={service.title || 'este servicio'}
          siteIdentity={siteIdentity}
          source={`service_${slug}_quick_actions`}
        />
        <ServiceLandingSections
          landing={service.landing}
          serviceTitle={service.title || 'Servicio legal'}
          siteIdentity={siteIdentity}
          source={`service_${slug}_landing`}
        />
        <PortableTextAndToc
          article={service}
          breadcrumbsItems={breadcrumbsItems}
          currentPath={`https://www.abogadossanfelipe.cl/services/${slug}`}
          cta={service.contentCta || settings?.defaultContentCta}
          ctaSource={`service_${slug}`}
          siteIdentity={siteIdentity}
        />
      </div>
    </section>
  );
}
