'use server';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ContentContactCta from '@/components/content/ContentContactCta';
import PageTemplate from '@/components/pages/PageTemplate';
import {
  ComponentWithBannerPosts,
  ComponentWithServices,
  ComponentsProps,
} from '@/components/types';
import { portableTextToPlainText } from '@/lib/portable-text';
import { buildSeoMetadata } from '@/lib/seo';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPostListByUnitBusinessFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getUnitBusinessBySlugFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import {
  GetPostListByUnitBusinessQueryResult,
  GetUnitBusinessDetailQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';

async function getData(slug: string) {
  try {
    const [unitBusiness, posts, settings]: [
      GetUnitBusinessDetailQueryResult,
      GetPostListByUnitBusinessQueryResult | null,
      SettingsQueryResult,
    ] = await Promise.all([
      getUnitBusinessBySlugFetch(slug),
      getPostListByUnitBusinessFetch(slug),
      getSettingsFetch(),
    ]);

    return { unitBusiness, posts, settings };
  } catch (error) {
    console.error('Error fetching practice area:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);

  if (!data?.unitBusiness) {
    return {
      title: 'Area no encontrada',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSeoMetadata({
    title: data.unitBusiness.title,
    description: portableTextToPlainText(data.unitBusiness.description, 160),
    path: `/area-de-practica/${params.slug}`,
    seo: data.unitBusiness.seo,
    settings: data.settings,
    fallbackImage: data.unitBusiness.components?.[0]?.imageBackground,
    type: 'website',
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data?.unitBusiness) {
    notFound();
  }

  const { posts, settings, unitBusiness } = data;

  unitBusiness.components?.forEach((component) => {
    if (
      component.typeComponentValue === 'Carousel' &&
      component.variant == 'post'
    ) {
      (component as ComponentWithBannerPosts).bannerPostsItems = posts;
    } else if (component.typeComponentValue === 'BannerServices') {
      (component as ComponentWithServices).services = unitBusiness.services;
    }
  });

  if (!unitBusiness.components) {
    notFound();
  }

  return (
    <section>
      <PageTemplate components={unitBusiness.components as ComponentsProps} />
      <div className="site-container pb-16">
        <ContentContactCta
          cta={settings?.defaultContentCta}
          source={`practice_area_${params.slug}`}
        />
      </div>
    </section>
  );
}
