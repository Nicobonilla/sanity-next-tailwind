'use server';
import Posts from '@/components/pages/component/Posts';
import Resources from '@/components/pages/component/Resources';
import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentWithBannerPosts } from '@/components/types';
import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { Metadata } from 'next';
import { pages } from 'next/dist/build/templates/app-page';
type PageData = {
  home: GetPageDetailQueryResult | null;
  posts: GetPostListQueryResult | null;
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sebastián Bonilla | Abogados',
  };
}
async function getData(slug: string) {
  try {
    const [home, posts]: [
      GetPageDetailQueryResult | null,
      GetPostListQueryResult | null,
    ] = await Promise.all([getPageBySlugFetch(slug), getPostListFetch()]);
    return { home, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export type ModifiedComponent = ComponentWithBannerPosts & {
  bannerPostsItems?: GetPostListQueryResult | null;
};

export default async function Page() {
  const currentPage = await getData('inicio');
  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }
  // Crear una copia de los componentes para evitar mutaciones directas
  const { home, posts }: PageData = currentPage;

  const componentsAndPosts: ModifiedComponent = home?.components?.map(
    (component) => {
      if (
        component.typeComponentValue === 'Carousel' &&
        component.variant === 'post'
      ) {
        return {
          ...component,
          bannerPostsItems: posts,
        };
      }
      return component;
    }
  );

  return (
    <section>
      <div className="min-h-screen bg-gray-50">
        {componentsAndPosts && (
          <PageTemplate components={componentsAndPosts as ModifiedComponent} />
        )}
      </div>
    </section>
  );
}
