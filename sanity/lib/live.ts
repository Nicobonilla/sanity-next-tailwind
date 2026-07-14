'use server';
import { createClient, defineLive } from 'next-sanity';
import { token } from './token';
import { dataset, projectId, studioUrl } from './api';

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: 'vX', // Target the experimental API version
  stega: { studioUrl },
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 3600,
  },
});
