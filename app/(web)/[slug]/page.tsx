import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentsProps } from '@/components/types';
import { GetPageDetailQueryResult } from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import type { Metadata } from 'next';
import { WebPage, WithContext } from 'schema-dts';
import { buildDocumentMetadata, serializeJsonLd } from '@/sanity/lib/seo';
import type { SeoDocument } from '@/sanity/lib/seo';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const currentPage = await getData(params.slug);
  if (!currentPage) notFound();

  return buildDocumentMetadata({
    document: currentPage,
    path: `/${params.slug}`,
    fallbackImage: currentPage?.components?.[0]?.imageBackground,
  });
}

async function getData(slug: string) {
  try {
    return (await getPageBySlugFetch(slug)) as GetPageDetailQueryResult;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params?.slug);
  if (!data) notFound();
  const page = data;
  const seoPage = page as unknown as SeoDocument;

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page?.title || 'Abogados San Felipe',
    description: seoPage.seo?.metaDescription || page?.resumen || undefined,
    url: `https://www.abogadossanfelipe.cl/${params.slug}`,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {page?.components ? (
        <PageTemplate components={page.components as ComponentsProps} />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </section>
  );
}
