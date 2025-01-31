import {
  GetPageDetailQueryResult,
  GetPagesNavQueryResult,
} from '@/sanity.types';
import { sanityFetch } from '../fetch';
import { getPageDetailQuery, getPagesNavQuery } from '../queries/page.query';

/* MAIN PAGES */
export async function getPagesNavFetch(): Promise<GetPagesNavQueryResult | null> {
  const query = getPagesNavQuery;
  try {
    const data = (await sanityFetch({
      query,
    })) as GetPagesNavQueryResult | null;
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null; // Si no hay datos, retornamos null
    }
    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}

export async function getPageBySlugFetch(
  slug: string
): Promise<GetPageDetailQueryResult | null> {
  // Remove extra quotes if any
  const query = getPageDetailQuery;
  const params = { slug: slug.replace(/"/g, '') }; // Pass the sanitized slug
  try {
    const data = (await sanityFetch({
      query,
      params,
    })) as GetPageDetailQueryResult | null;
    if (!data) {
      return null; // Si no hay datos, retornamos null
    }

    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}
