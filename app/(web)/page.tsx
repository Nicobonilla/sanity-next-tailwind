import Image from 'next/image';
import Form from '@/components/shared/Form';
import PageTemplate from '@/components/pages/PageTemplate';
import {
  GetPagesNavQueryResult,
  GetPageDetailQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch, getPagesNavFetch } from '@/sanity/lib/fetch';

async function getData() {
  try {
    const pages: GetPagesNavQueryResult | null = await getPagesNavFetch();
    const homePageSlug = pages?.find((page) => page.isHome === true);

    if (homePageSlug) {
      const currentPage: GetPageDetailQueryResult = await getPageBySlugFetch(
        homePageSlug.slug || ''
      );
      return currentPage || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page() {
  const currentPage: GetPageDetailQueryResult | undefined = await getData();

  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }

  return (
    <>
      {currentPage?.components ? (
        <PageTemplate dataPage={currentPage} />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
      <Image
        src="/icons/apacheairflow/apacheairflow-original-wordmark.svg"
        alt="JavaScript Icon"
        width={250}
        height={250}
      />
      <Form />
    </>
  );
}
