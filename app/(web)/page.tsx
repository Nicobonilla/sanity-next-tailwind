// app/page.tsx

import Form from '@/components/shared/Form';
import PageTemplate from '@/components/pages/PageTemplate';
import { Component, SanPage } from '@/sanity/fetchs/pagesFetch';
import { GetPagesNavQueryResult } from '@/sanity.types';
import { getPageBySlugFetch, getPagesNavFetch } from '@/sanity/lib/fetch';
import Image from 'next/image';

export default async function Page() {
  let currentPage: SanPage | null = null;

  try {
    const pages: GetPagesNavQueryResult | null = await getPagesNavFetch();
    const homePageSlug = pages?.find((page) => page.isHome === true);
    if (homePageSlug) {
      currentPage = await getPageBySlugFetch(homePageSlug.slug || '');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  if (!currentPage) {
    return <div>Error al cargar la lista de páginas.</div>;
  }

  return (
    <>
      {currentPage?.components && (
        <PageTemplate components={currentPage?.components as Component[]} />
      )}
      <Form />
      <Image
        src="/icons/apacheairflow/apacheairflow-original-wordmark.svg"
        alt="JavaScript Icon"
        width={250}
        height={250}
      />
    </>
  );
}
