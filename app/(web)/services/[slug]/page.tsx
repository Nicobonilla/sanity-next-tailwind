import PageTemplate from '@/components/pages/PageTemplate';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';

async function getData(slug: string) {
  try {
    const currentPage: GetServiceDetailQueryResult =
      await getServiceBySlugFetch(slug);

    return currentPage;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const currentPage: GetServiceDetailQueryResult | undefined = await getData(
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
