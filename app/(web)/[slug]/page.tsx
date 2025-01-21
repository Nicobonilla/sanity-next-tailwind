import PageTemplate from '@/components/pages/PageTemplate';
import { GetPageDetailQueryResult, SettingsQueryResult } from '@/sanity.types';
import { getPageBySlugFetch, getSettingsFetch } from '@/sanity/lib/fetch';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const currentPage = await getData(params.slug);
  return {
    title: currentPage?.settings?.title,
    openGraph: {
      title: currentPage?.settings?.title || '',
      type: 'website',
    },
    other: {
      'table-of-contents': JSON.stringify(
        'currentPage?.home?.components?.tableOfContents'
      ), // need to retrieve the content of components to generate the table of contents
    },
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
  const data = await getData(params?.slug);
  if (!data) {
    return <div>Página no encontrada.</div>;
  }
  const { page }: { page: GetPageDetailQueryResult } = data;

  if (!page) {
    return <div>Pagina no encontrado.</div>; // Manejo básico de errores
  }
  return (
    <>
      {page?.components ? (
        <PageTemplate dataPage={page} />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </>
  );
}
