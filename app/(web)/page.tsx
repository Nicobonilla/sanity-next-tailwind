'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { GetPageDetailQueryResult, SettingsQueryResult } from '@/sanity.types';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const currentPage = await getData('inicio');
  console.log('currentPage', currentPage);
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
    const [home, settings]: [GetPageDetailQueryResult, SettingsQueryResult] =
      await Promise.all([getPageBySlugFetch(slug), getSettingsFetch()]);
    return { home, settings };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page() {
  const currentPage = await getData('inicio');
  console.log('currentPage', currentPage);
  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }

  return (
    <>
      {currentPage.home?.components ? (
        <PageTemplate dataPage={currentPage.home} />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </>
  );
}
