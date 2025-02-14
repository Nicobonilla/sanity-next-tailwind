import {
  GetServiceDetailQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';
import {
  getServiceDetailQuery,
  getServicesNavQuery,
} from '../queries/service.query';
import { sanityFetch } from '../fetch';

/* SERVICES */
export async function getServicesNavFetch(): Promise<GetServicesNavQueryResult | null> {
  // Remove extra quotes if any
  const query = getServicesNavQuery;

  try {
    const services = (await sanityFetch({
      query,
    })) as GetServicesNavQueryResult | null;
    // Si service es null, retornamos null
    if (!services || (Array.isArray(services) && services.length === 0)) {
      return null; // Si no hay datos, retornamos null
    }
    return services;
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}

export async function getServiceBySlugFetch(
  slug: string
): Promise<GetServiceDetailQueryResult | null> {
  // Remove extra quotes if any
  const query = getServiceDetailQuery; // This should be a GROQ string
  const params = { slug: slug.replace(/"/g, '') }; // Pass the sanitized slug

  try {
    const service = (await sanityFetch({
      query,
      params,
    })) as GetServiceDetailQueryResult | null;

    // Si service es null, retornamos null
    if (!service) {
      return null; // Si no hay servicio, retornamos null
    }

    return service;
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}
