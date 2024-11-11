// app/page.tsx

import Image from 'next/image';
import Form from '@/components/shared/Form';
import PageTemplate from '@/components/pages/PageTemplate';
import {
  GetPagesNavQueryResult,
  GetPageDetailQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch, getPagesNavFetch } from '@/sanity/lib/fetch';

export default async function Page() {
  try {
    const pages: GetPagesNavQueryResult | null = await getPagesNavFetch();
    const homePageSlug = pages?.find((page) => page.isHome === true);
    if (homePageSlug) {
      const currentPage: GetPageDetailQueryResult = await getPageBySlugFetch(
        homePageSlug.slug || ''
      );
      if (!currentPage) {
        return <div>Error al cargar la lista de páginas.</div>;
      }
      return (
        <>
          {currentPage?.components && (
            <PageTemplate dataPage={currentPage as GetPageDetailQueryResult} />
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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
