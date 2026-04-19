'use server';
import { createClient } from 'next-sanity';
import { defineLive } from 'next-sanity/live';

import { apiVersion, dataset, projectId } from './api';
import { token } from './token';

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  stega: { studioUrl: '/studio' },
});

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
