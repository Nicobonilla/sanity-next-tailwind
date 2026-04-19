import { sanityFetch } from '../fetch';
import { getHomePageQuery } from '../queries/homePage.query';
import { GetHomePageQueryResult } from '@/sanity.types';

export async function getHomePageFetch(): Promise<GetHomePageQueryResult | null> {
  try {
    const data = (await sanityFetch({
      query: getHomePageQuery,
      tags: ['home:page'],
    })) as GetHomePageQueryResult | null;

    return data || null;
  } catch (error) {
    console.error('Error fetching home page:', error);
    throw error;
  }
}
