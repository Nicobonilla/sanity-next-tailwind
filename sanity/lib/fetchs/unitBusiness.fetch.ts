import { GetUnitBusinessListQueryResult } from '@/sanity.types';
import { getUnitBusinessListQuery } from '../queries/unitBusiness.query';
import { sanityFetch } from '../fetch';

export async function getUnitBusinessListFetch(): Promise<GetUnitBusinessListQueryResult | null> {
  // Remove extra quotes if any
  const query = getUnitBusinessListQuery;
  try {
    const unitsBusiness = (await sanityFetch({
      query,
    })) as GetUnitBusinessListQueryResult | null;

    // Si service es null, retornamos null
    if (!unitsBusiness) return null;
    return unitsBusiness;
  } catch (error) {
    console.error('Error fetching unitsBusiness:', error);
    throw error;
  }
}
