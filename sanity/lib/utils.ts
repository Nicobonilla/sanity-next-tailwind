import createImageUrlBuilder from '@sanity/image-url';
import { SanityClient } from 'sanity';
import { ValidationContext } from 'sanity';

import { dataset, projectId } from '@/sanity/lib/api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (
  source: { asset?: { _ref?: string } } | null | undefined,
) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    // If there's no valid reference, create a fallback source
    source = {
      asset: {
        _ref: 'image-aa5cf84793776bbe4a334f44bd118fb6e057d26f-667x658-jpg',
      },
    };
  }

  // Return the URL for the image
  return imageBuilder
    ?.image(source)
    .auto('format')
    .fit('max')
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
    case 'page':
      if (!slug) return '/'; // This is the home page
      return `/${slug}`;
    case 'service':
      return slug ? `/services/${slug}` : undefined;
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

export async function isUniqueTrueForField(
  value: boolean | undefined,
  context: ValidationContext
) {
  // Solo aplica la validación si el valor es `true`
  if (value !== true) return true; // Si no es `true`, no hace nada

  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2022-12-07' }) as SanityClient;

  if (!document) return true;

  const id = (document._id as string).replace(/^drafts\./, '');
  const params = { draft: `drafts.${id}`, published: id };

  // Consulta para verificar que solo haya un documento con el campo `true`
  const query = `!defined(*[!(_id in [$draft, $published]) && ${document._type} == $type && ${document._type}.isHome == true][0]._id)`;
  const result = await client.fetch(query, { ...params, type: document._type });

  // Si ya existe un documento con el valor `true`, regresa un error
  return result
    ? true
    : `Solo un documento de tipo "${document._type}" puede tener el campo "isHome" en verdadero`;
}
