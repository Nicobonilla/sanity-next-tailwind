'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentWithBannerPosts } from '@/components/types';
import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
} from '@/sanity.types';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { Metadata } from 'next';

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

export default async function Page(){
  const currentPage = await getData('inicio');

  // Crear una copia de los componentes para evitar mutaciones directas
  const componentsAndPosts:ModifiedComponent = currentPage?.home?.components?.map(
    (component) => {
      if (
        component.typeComponentValue === 'carousel' &&
        component.variant === 'post'
      ) {
        return {
          ...component,
          bannerPostsItems: currentPage?.posts,
        };
      }
      return component;
    }
  );

  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }

  return (
    <>
      {componentsAndPosts ? (
        <PageTemplate components={componentsAndPosts as ModifiedComponent } />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </>
  );
}
