import { cache } from 'react';
import { SitemapQueryResult } from '@/sanity.types';
import { sanityFetch } from '../fetch';
import { sitemapQuery } from '../queries/sitemap.query';

export const getSitemapFetch = cache(
  async (): Promise<SitemapQueryResult> =>
    (await sanityFetch({
      query: sitemapQuery,
      tag: 'sitemap',
    })) as SitemapQueryResult
);
