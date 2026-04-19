import { client } from '@/sanity/lib/client';

import { SettingsQueryResult } from '@/sanity.types';
import { settingsQuery } from './queries';

export async function sanityFetch<const QueryString extends string>({
  revalidate = 3600,
  query,
  params = {},
  tags = [],
}: {
  query: QueryString;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    perspective: 'published',
    next: {
      revalidate,
      tags,
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
