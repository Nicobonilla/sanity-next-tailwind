import type { Metadata } from 'next';
import { resolveOpenGraphImage } from './utils';

type SeoImage = Parameters<typeof resolveOpenGraphImage>[0];

export type SeoDocument = {
  title?: string | null;
  resumen?: string | null;
  _updatedAt?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
    ogImage?: SeoImage;
  } | null;
};

export function getSiteUrl(configuredUrl?: string | null) {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ||
    configuredUrl ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'www.abogadossanfelipe.cl';

  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, '');
}

export function buildDocumentMetadata({
  document,
  path,
  fallbackImage,
  type = 'website',
}: {
  document: SeoDocument | null | undefined;
  path: string;
  fallbackImage?: SeoImage;
  type?: 'article' | 'website';
}): Metadata {
  if (!document) {
    return {
      title: 'Contenido no encontrado',
      robots: { index: false, follow: false },
    };
  }

  const title = document.seo?.metaTitle || document.title || '';
  const description =
    document.seo?.metaDescription ||
    document.resumen ||
    undefined;
  const image = resolveOpenGraphImage(
    document.seo?.ogImage || fallbackImage
  );
  const canonical = document.seo?.canonicalUrl || path;

  return {
    title,
    description,
    alternates: { canonical },
    robots: document.seo?.noIndex
      ? { index: false, follow: false }
      : undefined,
    openGraph: {
      title,
      description,
      images: image,
      type,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image,
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
