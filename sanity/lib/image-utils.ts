import createImageUrlBuilder from '@sanity/image-url';

import { dataset, projectId } from '@/sanity/lib/api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (
  source:
    | { asset?: { _ref?: string | null } | null }
    | null
    | undefined
) => {
  if (!source?.asset?._ref) {
    source = {
      asset: {
        _ref: 'image-aa5cf84793776bbe4a334f44bd118fb6e057d26f-667x658-jpg',
      },
    };
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}
