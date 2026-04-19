import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/seo';
import { getSettingsFetch } from '@/sanity/lib/fetch';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettingsFetch();
  const baseUrl = getSiteUrl(settings?.metaBaseWebsite);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/draft', '/api/disable', '/api/revalidate-path'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
