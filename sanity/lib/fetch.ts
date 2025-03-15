import { type ClientPerspective, type QueryParams } from 'next-sanity';
import { draftMode } from 'next/headers';

import { client } from '@/sanity/lib/client';
import { sanityFetch as liveFetch } from '@/sanity/lib/live';

import { type SettingsQueryResult } from '@/sanity.types';
import { settingsQuery } from './queries';
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

  const actualPerspective =
    perspective ?? (isEnabled ? 'previewDrafts' : 'published');

  const actualStega =
    stega ??
    (actualPerspective === 'previewDrafts' ||
      process.env.VERCEL_ENV === 'preview');

  console.log('Actual Perspective:', actualPerspective);
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
  console.log('NODE_ENNV:', process.env.NODE_ENV);
  console.log('Actual Stega (Visual Editing):', actualStega);
  if (actualPerspective === 'previewDrafts') {
    console.log("Fetching in draft mode with perspective 'previewDrafts'");

    // Reemplazamos client.fetch por liveFetch
    const result = await liveFetch({
      query,
      params,
      perspective: 'previewDrafts',
    });

    return result.data;
  }

  //console.log("Fetching in production mode with perspective 'published'");
  return client.fetch(query, params, {
    stega: actualStega,
    perspective: 'published',
    next: {
      revalidate: 40000,
    },
  });
}

/* SINGLETONS - SETTINGS */
export async function getSettingsFetch(): Promise<SettingsQueryResult | null> {
  const query = settingsQuery;
  try {
    const data = (await sanityFetch({
      query,
    })) as SettingsQueryResult | null;
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null; // Si no hay datos, retornamos null
    }
    return data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error; // Opcionalmente vuelve a lanzar o maneja el error de acuerdo a tu necesidad
  }
}
