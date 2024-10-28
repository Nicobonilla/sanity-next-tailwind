import createImageUrlBuilder from '@sanity/image-url';
import { SanityClient } from 'sanity';
import { ValidationContext } from 'sanity';

import { dataset, projectId } from '@/sanity/lib/api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/posts/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

// Note: this assumes that every document that has a slug field
// has it on the `slug` field at the root
export async function isUniqueAcrossAllDocuments(
  slug: string,
  context: ValidationContext
) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2022-12-07' }) as SanityClient;
  if (typeof document === 'undefined') {
    return;
  }
  const id = (document._id as string).replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}
