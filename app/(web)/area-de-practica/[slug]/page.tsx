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
import { buildDocumentMetadata } from '@/sanity/lib/seo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);
  if (!data?.unitBusiness) notFound();

  const { unitBusiness } = data;
  return buildDocumentMetadata({
    document: unitBusiness,
    path: `/area-de-practica/${params.slug}`,
    fallbackImage: unitBusiness?.components?.[0]?.imageBackground,
  });
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
    //console.log('unitBusiness', unitBusiness);
    //console.log('posts', posts);

    return { unitBusiness, posts };
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const unitBusinessPage = await getData(params.slug);
  if (!unitBusinessPage?.unitBusiness) notFound();
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
