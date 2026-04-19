import type { MetadataRoute } from 'next';

import { getSiteUrl, isProductionIndexableEnvironment } from '@/lib/seo';
import { getSettingsFetch } from '@/sanity/lib/fetch';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettingsFetch();
  const baseUrl = getSiteUrl(settings?.metaBaseWebsite);

  if (!isProductionIndexableEnvironment()) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',
          '/studio/*',
          '/api/',
          '/api/draft',
          '/api/disable',
          '/api/revalidate-path',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
