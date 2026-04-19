import { SettingsQueryResult } from '@/sanity.types';
import { draftMode } from 'next/headers';

import { settingsQuery } from './queries';
import { sanityFetch as liveSanityFetch } from './live';

async function isDraftModeEnabled(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    return false;
  }
}

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags = [],
  perspective,
  stega,
}: {
  query: QueryString;
  params?: Record<string, unknown>;
  tags?: string[];
  perspective?: 'drafts' | 'published';
  stega?: boolean;
}) {
  const draftModeEnabled = await isDraftModeEnabled();
  const resolvedPerspective = perspective ?? (draftModeEnabled ? 'drafts' : 'published');
  const resolvedStega = stega ?? draftModeEnabled;

  const { data } = await liveSanityFetch({
    query,
    params,
    tags,
    perspective: resolvedPerspective,
    stega: resolvedStega,
  });

  return data;
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
