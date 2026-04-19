import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WebPage, WithContext } from 'schema-dts';

import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentsProps } from '@/components/types';
import { buildSeoMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);

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
    path: `/${params.slug}`,
    seo: data.page.seo,
    settings: data.settings,
    fallbackImage: data.page.components?.[0]?.imageBackground,
    type: 'website',
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data?.page) {
    notFound();
  }

  const { page } = data;

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title || siteConfig.firmName,
    description: page.resumen || siteConfig.descriptor,
    url: `https://www.abogadossanfelipe.cl/${params.slug}`,
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
