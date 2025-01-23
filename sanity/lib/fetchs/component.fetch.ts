import { GetComponentListQueryResult } from '@/sanity.types';
import { getComponentListQuery } from '../queries';
import { sanityFetch } from '../fetch';

export async function getComponentListFetch(): Promise<GetComponentListQueryResult | null> {
  // Remove extra quotes if any
  const query = getComponentListQuery;
  try {
    const data = (await sanityFetch({
      query,
    })) as GetComponentListQueryResult | null;
    // Si service es null, retornamos null
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null; // Si no hay datos, retornamos null
    }

    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}
