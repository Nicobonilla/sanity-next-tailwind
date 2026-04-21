import type { MetadataRoute } from 'next';

import { buildContentPath, normalizePathSegment } from '@/lib/path-utils';
import { getSiteUrl } from '@/lib/seo';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch, getPagesNavFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getServicesNavFetch } from '@/sanity/lib/fetchs/service.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import {
  GetPagesNavQueryResult,
  GetPostListQueryResult,
  GetServicesNavQueryResult,
  GetUnitBusinessListQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';

function toDate(value?: string | null) {
  return value ? new Date(value) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, pages, services, posts, unitBusiness, home]: [
    SettingsQueryResult | null,
    GetPagesNavQueryResult | null,
    GetServicesNavQueryResult | null,
    GetPostListQueryResult | null,
    GetUnitBusinessListQueryResult | null,
    Awaited<ReturnType<typeof getPageBySlugFetch>>,
  ] = await Promise.all([
    getSettingsFetch(),
    getPagesNavFetch(),
    getServicesNavFetch(),
    getPostListFetch(),
    getUnitBusinessListFetch(),
    getPageBySlugFetch('inicio'),
  ]);

  const baseUrl = getSiteUrl(
    process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : settings?.metaBaseWebsite
  );

  const staticPages = (pages || [])
    .filter(
      (page) =>
        !page.seo?.noIndex &&
        (page.isHome || Boolean(normalizePathSegment(page.slug)))
    )
    .map((page) => ({
      url: page.isHome
        ? baseUrl
        : `${baseUrl}/${normalizePathSegment(page.slug)}`,
      lastModified: toDate(page._updatedAt),
      changeFrequency: page.isHome ? ('weekly' as const) : ('monthly' as const),
      priority: page.isHome ? 1 : 0.8,
    }));

  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: posts?.[0]?._updatedAt ? new Date(posts[0]._updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  const servicesPages = (services || [])
    .filter(
      (service) =>
        !service.seo?.noIndex && Boolean(buildContentPath('/services', service.slug))
    )
    .map((service) => ({
      url: `${baseUrl}${buildContentPath('/services', service.slug)}`,
      lastModified: toDate(service._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const postsPages = (posts || [])
    .filter(
      (post) => !post.seo?.noIndex && Boolean(buildContentPath('/blog', post.slug))
    )
    .map((post) => ({
      url: `${baseUrl}${buildContentPath('/blog', post.slug)}`,
      lastModified: toDate(post._updatedAt || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const unitBusinessPages = (unitBusiness || [])
    .filter(
      (area) =>
        !area.seo?.noIndex &&
        Boolean(buildContentPath('/area-de-practica', area.slug))
    )
    .map((area) => ({
      url: `${baseUrl}${buildContentPath('/area-de-practica', area.slug)}`,
      lastModified: toDate(area._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

  const uniqueEntries = new Map<string, MetadataRoute.Sitemap[number]>();

  [
    ...staticPages,
    blogIndex,
    ...servicesPages,
    ...postsPages,
    ...unitBusinessPages,
  ].forEach((entry) => {
    uniqueEntries.set(entry.url, entry);
  });

  if (!uniqueEntries.has(baseUrl)) {
    uniqueEntries.set(baseUrl, {
      url: baseUrl,
      lastModified: toDate(home?._updatedAt),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  return Array.from(uniqueEntries.values());
}
