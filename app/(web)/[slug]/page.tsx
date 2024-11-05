import PageTemplate from '@/components/pages/PageTemplate';
import { GetPageDetailQueryResult } from '@/sanity.types';
import { Component } from '@/sanity/fetchs/pagesFetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetch';

export default async function Page({ params }: { params: { slug: string } }) {
  const currentPage: GetPageDetailQueryResult = await getPageBySlugFetch(
    params.slug
  );

  if (!currentPage) {
    return <div>Pagina no encontrado.</div>; // Manejo básico de errores
  }
  console.log('slug: ', params.slug);
  return (
    <>
      {currentPage?.components && (
        <PageTemplate components={currentPage?.components as Component[]} />
      )}
    </>
  );
}
