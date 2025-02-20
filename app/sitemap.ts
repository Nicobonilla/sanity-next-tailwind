import { getSettingsFetch } from '@/sanity/lib/fetch';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const settings = await getSettingsFetch();
    const baseUrl = `https://${
      process.env.NODE_ENV === 'development'
        ? 'localhost:3000'
        : settings?.metaBaseWebsite
    }`;
    return [
        {
          url: baseUrl,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        },
        {
          url: `${baseUrl}/nostros`,
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
      ];
}
