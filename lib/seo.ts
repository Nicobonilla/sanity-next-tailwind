import type { Metadata } from 'next';

import { resolveOpenGraphImage } from '@/sanity/lib/image-utils';

type SeoImage = {
  alt?: string | null;
  asset?: { _ref?: string | null } | null;
} | null;

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

export function getSiteUrl(hostOrUrl?: string | null) {
  if (!hostOrUrl) {
    return DEFAULT_SITE_URL;
  }

  const normalized = hostOrUrl.trim().replace(/\/+$/, '');

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
  const siteUrl = getSiteUrl(settings?.metaBaseWebsite);
  const resolvedTitle = seo?.metaTitle || title || undefined;
  const resolvedDescription =
    seo?.metaDescription || description || settings?.description || undefined;
  const keywords = (seo?.keywords || []).filter(Boolean) as string[];
  const canonical =
    seo?.canonicalUrl || (path ? new URL(path, siteUrl).toString() : undefined);
  const openGraphImage =
    resolveOpenGraphImage(seo?.ogImage || fallbackImage || settings?.ogImage) ||
    undefined;
  const noIndex = Boolean(seo?.noIndex);

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
      title: seo?.ogTitle || resolvedTitle,
      description: seo?.ogDescription || resolvedDescription,
      url: canonical,
      type,
      images: openGraphImage ? [openGraphImage] : undefined,
    },
    twitter: {
      card: openGraphImage ? 'summary_large_image' : 'summary',
      title: seo?.ogTitle || resolvedTitle,
      description: seo?.ogDescription || resolvedDescription,
      images: openGraphImage ? [openGraphImage.url] : undefined,
    },
  };
}
