import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});
