import { type ClientPerspective, type QueryParams } from 'next-sanity';
import { draftMode } from 'next/headers';

import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';

import {
  getServiceDetailQuery,
  getServicesNavQuery,
  getComponentListQuery,
  getPageDetailQuery,
  getPagesNavQuery,
} from '@/sanity/lib/queries';
import {
  GetComponentListQueryResult,
  GetIconListQueryResult,
  GetPageDetailQueryResult,
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
  type GetServiceDetailQueryResult,
} from '@/sanity.types';
/**
 * Used to fetch data in Server Components, it has built in support for handling Draft Mode and perspectives.
 * When using the "published" perspective then time-based revalidation is used, set to match the time-to-live on Sanity's API CDN (60 seconds)
 * and will also fetch from the CDN.
 * When using the "previewDrafts" perspective then the data is fetched from the live API and isn't cached, it will also fetch draft content that isn't published yet.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  perspective,
  stega,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective?: Omit<ClientPerspective, 'raw'>;
  stega?: boolean;
}) {
  const { isEnabled } = await draftMode();
  console.log('Draft Mode Enabled:', isEnabled);
  const actualPerspective =
    perspective ?? (isEnabled ? 'previewDrafts' : 'published');
  const actualStega =
    stega ??
    (actualPerspective === 'previewDrafts' ||
      process.env.VERCEL_ENV === 'preview');

  console.log('Draft Mode Enabled:', isEnabled);
  console.log('Actual Perspective:', actualPerspective);
  console.log('Actual Stega (Visual Editing):', actualStega);

  if (actualPerspective === 'previewDrafts') {
    console.log("Fetching in draft mode with perspective 'previewDrafts'");
    return client.fetch(query, params, {
      stega: actualStega,
      perspective: 'previewDrafts',
      token,
      useCdn: false,
      // Configuración razonable de revalidación para reducir la carga
      next: { revalidate: 0 }, // Revalida cada 5 minutos en borrador
    });
  }

  console.log("Fetching in production mode with perspective 'published'");
  return client.fetch(query, params, {
    stega: actualStega,
    perspective: 'published',
    useCdn: true,
    // Revalida cada 10 minutos en producción
    next: { revalidate: 60 },
  });
}

/* MAIN PAGES */
export async function getPagesNavFetch(): Promise<GetPagesNavQueryResult | null> {
  // Remove extra quotes if any
  const query = getPagesNavQuery; // This should be a GROQ string

  try {
    const data = (await sanityFetch({
      query,
    })) as GetPagesNavQueryResult | null;
    // Si service es null, retornamos null
    // Si data es null o está vacío, retornamos null
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
  const sanitizedSlug = slug.replace(/"/g, ''); // This ensures the slug has no quotes
  const query = getPageDetailQuery; // This should be a GROQ string
  const params = { slug: sanitizedSlug }; // Pass the sanitized slug

  try {
    const data = (await sanityFetch({
      query,
      params,
    })) as GetPageDetailQueryResult | null;
    // Si service es null, retornamos null
    // Si data es null o está vacío, retornamos null
    if (!data) {
      return null; // Si no hay datos, retornamos null
    }

    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}

/* SERVICES */
export async function getServicesNavFetch(): Promise<GetServicesNavQueryResult | null> {
  // Remove extra quotes if any
  const query = getServicesNavQuery; // This should be a GROQ string

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
  const sanitizedSlug = slug.replace(/"/g, ''); // This ensures the slug has no quotes
  const query = getServiceDetailQuery; // This should be a GROQ string
  const params = { slug: sanitizedSlug }; // Pass the sanitized slug

  try {
    const service = (await sanityFetch({
      query,
      params,
    })) as GetServiceDetailQueryResult | null;

    // Si service es null, retornamos null
    if (!service) {
      return null; // Si no hay servicio, retornamos null
    }

    // Transformar table of contents
    const tableOfContents =
      service.tableOfContents?.map((block: any) => ({
        _key: block._key, // Asegúrate de usar _key aquí
        style: block.style, // Mantén el estilo tal como está
        children: block.children
          ? [{ text: block.children[0]?.text || null }]
          : null, // Asegúrate de que children sea un array
      })) || null; // Si es null, asignamos null

    return {
      title: service.title || null, // Asegúrate de que title no sea undefined
      content: service.content || null, // Asegúrate de que content no sea undefined
      unitBusiness: service.unitBusiness || null, // Asegúrate de que unitBusiness no sea undefined
      tableOfContents,
      components: service.components || null, // Asegúrate de que components no sea undefined
    };
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}

export async function getComponentListFetch(): Promise<GetComponentListQueryResult | null> {
  // Remove extra quotes if any
  const query = getComponentListQuery; // This should be a GROQ string

  try {
    const data = (await sanityFetch({
      query,
    })) as GetComponentListQueryResult | null;
    // Si service es null, retornamos null
    // Si data es null o está vacío, retornamos null
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null; // Si no hay datos, retornamos null
    }

    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}

export async function getIconListFetch(): Promise<GetIconListQueryResult | null> {
  // Remove extra quotes if any
  const query = getComponentListQuery; // This should be a GROQ string

  try {
    const data = (await sanityFetch({
      query,
    })) as GetIconListQueryResult | null;
    // Si service es null, retornamos null
    // Si data es null o está vacío, retornamos null
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null; // Si no hay datos, retornamos null
    }

    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}
