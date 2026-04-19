import type { Metadata } from 'next';

import { cleanSanityString, cleanSanityValue } from '@/lib/sanity-clean';
import { resolveOpenGraphImage } from '@/sanity/lib/image-utils';

type SeoImage = {
  alt?: string | null;
  asset?: { _ref?: string | null } | null;
} | null;

type ImageBackgroundCarrier = {
  imageBackground?: SeoImage;
} | null;

type TypedImageBackgroundCarrier = ImageBackgroundCarrier & {
  typeComponentValue?: string;
};

type SeoValue = {
  canonicalUrl?: string | null;
  keywords?: (string | null)[] | null;
  metaDescription?: string | null;
  metaTitle?: string | null;
  noIndex?: boolean | null;
  ogDescription?: string | null;
  ogImage?: SeoImage;
  ogTitle?: string | null;
} | null;

type SettingsValue = {
  description?: string | null;
  metaBaseWebsite?: string | null;
  ogImage?: SeoImage;
} | null;

type BuildSeoMetadataOptions = {
  description?: string | null;
  fallbackImage?: SeoImage;
  path?: string;
  seo?: SeoValue;
  settings?: SettingsValue;
  title?: string | null;
  type?: 'article' | 'website';
};

const DEFAULT_SITE_URL = 'https://www.abogadossanfelipe.cl';

export function isProductionIndexableEnvironment() {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === 'production';
  }

  return process.env.NODE_ENV === 'production';
}

export function getSiteUrl(hostOrUrl?: string | null) {
  const cleanedHostOrUrl = cleanSanityString(hostOrUrl);

  if (!cleanedHostOrUrl) {
    return DEFAULT_SITE_URL;
  }

  const normalized = cleanedHostOrUrl.replace(/\/+$/, '');

  if (!normalized) {
    return DEFAULT_SITE_URL;
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return `https://${normalized}`;
}

export function buildMetadataBase(hostOrUrl?: string | null) {
  return new URL(getSiteUrl(hostOrUrl));
}

export function buildSeoMetadata({
  description,
  fallbackImage,
  path,
  seo,
  settings,
  title,
  type = 'website',
}: BuildSeoMetadataOptions): Metadata {
  const cleanSeo = cleanSanityValue(seo);
  const cleanSettings = cleanSanityValue(settings);

  const siteUrl = getSiteUrl(cleanSettings?.metaBaseWebsite);
  const resolvedTitle =
    cleanSanityString(cleanSeo?.metaTitle) || cleanSanityString(title);
  const resolvedDescription =
    cleanSanityString(cleanSeo?.metaDescription) ||
    cleanSanityString(description) ||
    cleanSanityString(cleanSettings?.description);
  const keywords = (cleanSanityValue(cleanSeo?.keywords || []) || []).filter(
    Boolean
  ) as string[];
  const canonical =
    cleanSanityString(cleanSeo?.canonicalUrl) ||
    (path ? new URL(path, siteUrl).toString() : undefined);
  const openGraphImage =
    resolveOpenGraphImage(
      cleanSeo?.ogImage || fallbackImage || cleanSettings?.ogImage
    ) ||
    undefined;
  const noIndex = Boolean(cleanSeo?.noIndex) || !isProductionIndexableEnvironment();

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      title: cleanSanityString(cleanSeo?.ogTitle) || resolvedTitle,
      description:
        cleanSanityString(cleanSeo?.ogDescription) || resolvedDescription,
      url: canonical,
      type,
      images: openGraphImage ? [openGraphImage] : undefined,
    },
    twitter: {
      card: openGraphImage ? 'summary_large_image' : 'summary',
      title: cleanSanityString(cleanSeo?.ogTitle) || resolvedTitle,
      description:
        cleanSanityString(cleanSeo?.ogDescription) || resolvedDescription,
      images: openGraphImage ? [openGraphImage.url] : undefined,
    },
  };
}

export function extractFallbackImage(components: unknown): SeoImage {
  if (!Array.isArray(components)) {
    return null;
  }

  for (const component of components as ImageBackgroundCarrier[]) {
    if (component?.imageBackground?.asset?._ref) {
      return component.imageBackground;
    }
  }

  return null;
}

export function extractComponentImageBackground(
  components: unknown,
  typeComponentValue: string
): SeoImage {
  if (!Array.isArray(components)) {
    return null;
  }

  for (const component of components as TypedImageBackgroundCarrier[]) {
    if (
      component?.typeComponentValue === typeComponentValue &&
      component.imageBackground?.asset?._ref
    ) {
      return component.imageBackground;
    }
  }

  return null;
}
