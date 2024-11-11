'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';

export default async function Page({ params }: { params: { slug: string } }) {
  const currentPage: GetServiceDetailQueryResult = await getServiceBySlugFetch(
    params.slug
  );
  if (currentPage) {
    return (
      <>
        {currentPage?.components && (
          <PageTemplate dataPage={currentPage as GetServiceDetailQueryResult} />
        )}
      </>
    );
  } else {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }
}
