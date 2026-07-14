import { type ClientPerspective, type QueryParams } from 'next-sanity';
import { cache } from 'react';
import { sanityFetch as liveFetch } from '@/sanity/lib/live';

import { SettingsQueryResult } from '@/sanity.types';
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
  tag,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective?: Exclude<ClientPerspective, 'raw'>;
  stega?: boolean;
  tag?: string;
}) {
  const result = await liveFetch({
    query,
    params,
    perspective,
    stega,
    tag,
  });

  return result.data;
}

/* SINGLETONS - SETTINGS */
export const getSettingsFetch = cache(
  async function getSettingsFetch(): Promise<SettingsQueryResult | null> {
    const query = settingsQuery;
    try {
      const data = (await sanityFetch({
        query,
        tag: 'settings',
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
);
