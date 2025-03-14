import PageTemplate from '@/components/pages/PageTemplate';
import { getPostListByUnitBusinessFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getUnitBusinessBySlugFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

import type { ComponentProps, ComponentWithBannerPosts } from '@/components/types';
import type { GetUnitBusinessDetailQueryResult, GetPostListByUnitBusinessQueryResult } from '@/sanity.types';
import { type Metadata } from 'next';

type PageData = {
  unitBusiness: GetUnitBusinessDetailQueryResult | null;
  posts: GetPostListByUnitBusinessQueryResult | null;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);
  if (!data) return { title: 'Servicio no encontrado' };
  const { unitBusiness } = data;
  return {
    title: unitBusiness?.title || '',
    openGraph: {
      title: unitBusiness?.title || '',
      type: 'article',
      images: resolveOpenGraphImage(unitBusiness?.components?.[0]?.imageBackground) || '',
    },
  };
}

async function getData(slug: string): Promise<PageData | null> {
  try {
    const [unitBusiness, posts] = await Promise.all([
      getUnitBusinessBySlugFetch(slug),
      getPostListByUnitBusinessFetch(slug),
    ]);
    return { unitBusiness, posts };
  } catch (error) {
    console.error('Error in area-de-practica/slug:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const currentPage = await getData(params.slug);
  if (!currentPage) {
    return <div>Servicio no encontrado.</div>;
  }

  const { unitBusiness, posts } = currentPage;

  const componentsWithData: (ComponentProps | ComponentWithBannerPosts)[] = unitBusiness?.components?.map(
    (component) => ({
      ...component,
      bannerPostsItems:
        component.typeComponentValue === 'Carousel' && component.variant === 'post'
          ? posts
          : undefined,
      services:
        component.typeComponentValue === 'BannerServices'
          ? unitBusiness?.services
          : undefined,
    })
  ) || [];

  return (
    <section>
      <PageTemplate components={componentsWithData} />
    </section>
  );
}
