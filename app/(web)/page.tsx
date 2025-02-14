'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import { ComponentWithBannerPosts } from '@/components/types';
import {
  GetPageDetailQueryResult,
  GetPostListQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const currentPage = await getData('inicio');
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
    const [home, posts, settings]: [
      GetPageDetailQueryResult,
      GetPostListQueryResult | null,
      SettingsQueryResult,
    ] = await Promise.all([
      getPageBySlugFetch(slug),
      getPostListFetch(),
      getSettingsFetch(),
    ]);
    return { home, posts, settings };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page() {
  const currentPage = await getData('inicio');

  // add posts brief to Banner Posts
  currentPage?.home?.components?.map((component) => {
    if (
      component.typeComponentValue === 'carousel' &&
      component.variant === 'post'
    ) {
      (component as ComponentWithBannerPosts).bannerPostsItems =
        currentPage?.posts;
    }
  });

  if (!currentPage) {
    return <div>Error al cargar la página.</div>;
  }

  return (
    <>
      {currentPage.home?.components ? (
        <PageTemplate
          dataPage={currentPage?.home as GetPageDetailQueryResult}
        />
      ) : (
        <div>No se encontraron componentes para esta página.</div>
      )}
    </>
  );
}
