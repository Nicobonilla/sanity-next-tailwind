import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentsProps } from '@/components/types';
import { GetPageDetailQueryResult, SettingsQueryResult } from '@/sanity.types';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const currentPage = await getData(params.slug);
  return {
    title: currentPage?.page?.title,
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
  const { page } = data;

  if (!page) {
    return <div>Pagina no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <>
      {page?.components ? (
        <PageTemplate components={page.components as ComponentsProps} />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </>
  );
}
