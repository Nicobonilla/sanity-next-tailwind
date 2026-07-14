import { MetadataRoute } from 'next';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getSitemapFetch } from '@/sanity/lib/fetchs/sitemap.fetch';
import { getSiteUrl } from '@/sanity/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, content] = await Promise.all([
    getSettingsFetch(),
    getSitemapFetch(),
  ]);
  const baseUrl = getSiteUrl(settings?.metaBaseWebsite);

  const pages: MetadataRoute.Sitemap = (content.pages || []).map((page) => ({
    url: page.isHome ? baseUrl : `${baseUrl}/${page.slug}`,
    lastModified: page._updatedAt,
    changeFrequency: page.isHome ? 'weekly' : 'monthly',
    priority: page.isHome ? 1 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = (content.posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const services: MetadataRoute.Sitemap = (content.services || []).map(
    (service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service._updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  );

  const unitBusiness: MetadataRoute.Sitemap = (content.unitBusiness || []).map(
    (unit) => ({
      url: `${baseUrl}/area-de-practica/${unit.slug}`,
      lastModified: unit._updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  );

  const fallbackPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return Array.from(
    new Map(
      [...fallbackPages, ...pages, ...services, ...unitBusiness, ...posts].map(
        (entry) => [entry.url, entry]
      )
    ).values()
  );
}
