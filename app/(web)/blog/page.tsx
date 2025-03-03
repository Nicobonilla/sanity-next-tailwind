import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { Metadata } from 'next';
import PageTemplate from '@/components/pages/PageTemplate';
import Posts from '@/components/pages/component/Posts';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import { ComponentProps, ComponentsProps } from '@/components/types';
import Resources from '@/components/pages/component/Resources';

type PageData = {
  page: GetPageDetailQueryResult | null;
  posts: GetPostListQueryResult | null;
  unitBusiness: GetUnitBusinessListQueryResult | null;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Información Sobre Procedimientos Legales',
  };
}

async function getDataPage() {
  try {
    const [page, posts, unitBusiness]: [
      GetPageDetailQueryResult | null,
      GetPostListQueryResult | null,
      GetUnitBusinessListQueryResult | null,
    ] = await Promise.all([
      await getPageBySlugFetch('blog'),
      await getPostListFetch(),
      await getUnitBusinessListFetch(),
    ]);
    return { page, posts, unitBusiness };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page() {
  const data = await getDataPage();
  if (!data) {
    return <div>Error fetching data</div>;
  }
  const { page, posts, unitBusiness }: PageData = data;
  //console.log('page blog', page);
  return (
    <section>
      {page?.components?.[0] && (
        <PageTemplate components={[page.components?.[0]] as ComponentsProps} />
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <Posts posts={posts || []} unitBusiness={unitBusiness || []} />
            </div>
            {page?.components?.[1] && (
              <Resources data={page?.components?.[1] as ComponentProps} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
