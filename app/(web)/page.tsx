import Image from 'next/image';
import Form from '@/components/shared/Form';
import PageTemplate from '@/components/pages/PageTemplate';
import { GetHomeDetailQueryResult } from '@/sanity.types';
import { getHomeDetailFetch } from '@/sanity/lib/fetch';

async function getData() {
  try {
    const home: GetHomeDetailQueryResult | null = await getHomeDetailFetch();
    return home;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page() {
  const currentPage: GetHomeDetailQueryResult | undefined = await getData();
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
