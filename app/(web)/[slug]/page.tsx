import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WebPage, WithContext } from 'schema-dts';

import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentsProps } from '@/components/types';
import { buildSeoMetadata, extractFallbackImage } from '@/lib/seo';
import { resolveSiteIdentity } from '@/lib/site-identity';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import {
  getPageBySlugFetch,
  getPagesNavFetch,
} from '@/sanity/lib/fetchs/page.fetch';
import { GetPageDetailQueryResult, SettingsQueryResult } from '@/sanity.types';

async function getData(slug: string) {
  try {
    const [page, settings]: [GetPageDetailQueryResult, SettingsQueryResult] =
      await Promise.all([getPageBySlugFetch(slug), getSettingsFetch()]);

    return { page, settings };
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await getPagesNavFetch();

  return (pages || [])
    .filter(
      (page) =>
        !page.isHome &&
        Boolean(page.slug) &&
        !['blog'].includes(page.slug || '')
    )
    .map((page) => ({
      slug: page.slug!,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.page) {
    return {
      title: 'Pagina no encontrada',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSeoMetadata({
    title: data.page.title,
    description: data.page.resumen,
    path: `/${slug}`,
    seo: data.page.seo,
    settings: data.settings,
    fallbackImage: extractFallbackImage(data.page.components),
    type: 'website',
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.page) {
    notFound();
  }

  const { page } = data;
  const siteIdentity = resolveSiteIdentity(data.settings);

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title || siteIdentity.firmName,
    description: page.resumen || siteIdentity.descriptor,
    url: `https://www.abogadossanfelipe.cl/${slug}`,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {page.components ? (
        <PageTemplate components={page.components as ComponentsProps} />
      ) : (
        <div>No se encontraron componentes para esta pagina.</div>
      )}
    </section>
  );
}
