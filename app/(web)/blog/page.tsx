import { GetPageDetailQueryResult } from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { Metadata } from 'next';
import PageTemplate from '@/components/pages/PageTemplate';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Información Sobre Procedimientos Legales',
    openGraph: {
      title: 'Información Sobre Procedimientos Legales',
      type: 'website',
    },
  };
}
async function getDataPage() {
  try {
    const page: GetPageDetailQueryResult | null =
      await await getPageBySlugFetch('blog');

    return page;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page() {
  const page = await getDataPage();
  if (!page) {
    return <div>Error fetching data</div>;
  }
  return page?.components ? (
    <PageTemplate dataPage={page} />
  ) : (
    <div>No se encontraron componentes para esta página.</div>
  );
}
