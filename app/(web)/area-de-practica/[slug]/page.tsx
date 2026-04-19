'use server';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ContentContactCta from '@/components/content/ContentContactCta';
import PageTemplate from '@/components/pages/PageTemplate';
import {
  ComponentWithBannerPosts,
  ComponentProps,
  ComponentWithServices,
  ComponentsProps,
} from '@/components/types';
import { portableTextToPlainText } from '@/lib/portable-text';
import { buildSeoMetadata, extractFallbackImage } from '@/lib/seo';
import { resolveSiteIdentity } from '@/lib/site-identity';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPostListByUnitBusinessFetch } from '@/sanity/lib/fetchs/post.fetch';
import {
  getUnitBusinessBySlugFetch,
  getUnitBusinessListFetch,
} from '@/sanity/lib/fetchs/unitBusiness.fetch';
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const areas = await getUnitBusinessListFetch();

  return (areas || [])
    .filter((area) => Boolean(area.slug))
    .map((area) => ({
      slug: area.slug!,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);

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
    path: `/area-de-practica/${slug}`,
    seo: data.unitBusiness.seo,
    settings: data.settings,
    fallbackImage: extractFallbackImage(data.unitBusiness.components),
    type: 'website',
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.unitBusiness) {
    notFound();
  }

  const { posts, settings, unitBusiness } = data;
  const siteIdentity = resolveSiteIdentity(settings);
  const components = (unitBusiness.components || []) as ComponentsProps;

  components.forEach((component: ComponentProps) => {
    if (
      component.typeComponentValue === 'Carousel' &&
      component.variant == 'post'
    ) {
      (component as ComponentWithBannerPosts).bannerPostsItems = posts;
    } else if (component.typeComponentValue === 'BannerServices') {
      (component as ComponentWithServices).services = unitBusiness.services;
    }
  });

  if (!components.length) {
    notFound();
  }

  return (
    <section>
      <PageTemplate components={components} />
      <div className="site-container pb-16">
        <ContentContactCta
          cta={settings?.defaultContentCta}
          siteIdentity={siteIdentity}
          source={`practice_area_${slug}`}
        />
      </div>
    </section>
  );
}
