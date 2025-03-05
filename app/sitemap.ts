import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPostListFetch } from '@/sanity/lib/fetchs/post.fetch';
import { getServicesNavFetch } from '@/sanity/lib/fetchs/service.fetch';
import { MetadataRoute } from 'next';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import {
  GetPostListQueryResult,
  GetServicesNavQueryResult,
  GetUnitBusinessListQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, services, posts, unitBusiness]: [
    SettingsQueryResult | null,
    GetServicesNavQueryResult | null,
    GetPostListQueryResult | null,
    GetUnitBusinessListQueryResult | null,
  ] = await Promise.all([
    getSettingsFetch(),
    getServicesNavFetch(),
    getPostListFetch(),
    getUnitBusinessListFetch(),
  ]);
  const baseUrl = `https://${
    process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : settings?.metaBaseWebsite
  }`;
  const servicesPages = services?.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const postsPages = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const unitBusinessPages = unitBusiness?.map((unitBusiness) => ({
    url: `${baseUrl}/area-de-practica/${unitBusiness.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...(servicesPages || []),
    ...(postsPages || []),
    ...(unitBusinessPages || []),
  ];
}
