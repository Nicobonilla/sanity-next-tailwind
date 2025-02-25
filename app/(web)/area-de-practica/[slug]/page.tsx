'use server';
import PageTemplate from '@/components/pages/PageTemplate';
import {
  ComponentsProps,
  ComponentWithBannerPosts,
  ComponentWithServices,
} from '@/components/types';
import {
  GetPostListByUnitBusinessQueryResult,
  GetUnitBusinessDetailQueryResult,
} from '@/sanity.types';
import { getPostListByUnitBusinessFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getUnitBusinessBySlugFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);
  if (!data) return { title: 'Servicio no encontrado' };
  const { unitBusiness } = data;
  return {
    title: unitBusiness?.title,
  };
}

async function getData(slug: string) {
  try {
    const [unitBusiness, posts]: [
      GetUnitBusinessDetailQueryResult,
      GetPostListByUnitBusinessQueryResult | null,
    ] = await Promise.all([
      getUnitBusinessBySlugFetch(slug),
      getPostListByUnitBusinessFetch(slug),
    ]);
    console.log('unitBusiness', unitBusiness);
    console.log('posts', posts);

    return { unitBusiness, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const unitBusinessPage = await getData(params.slug);
  console.log('unitBusinessPage', unitBusinessPage);
  // add posts brief to Banner Posts
  unitBusinessPage?.unitBusiness?.components?.map((component) => {
    if (
      component.typeComponentValue === 'Carousel' &&
      component?.variant == 'post'
    ) {
      (component as ComponentWithBannerPosts).bannerPostsItems =
        unitBusinessPage?.posts;
    } else if (component.typeComponentValue === 'BannerServices') {
      (component as ComponentWithServices).services =
        unitBusinessPage?.unitBusiness?.services;
    }
  });

  if (!unitBusinessPage) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }
  return (
    <section>
      {unitBusinessPage?.unitBusiness?.components ? (
        <PageTemplate
          components={
            unitBusinessPage.unitBusiness.components as ComponentsProps
          }
        />
      ) : (
        <div>Servicio no encontrado.</div>
      )}
    </section>
  );
}
