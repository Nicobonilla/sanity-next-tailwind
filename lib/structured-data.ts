import { cleanSanityString } from '@/lib/sanity-clean';

type BreadcrumbItem = {
  label: string;
  path: string;
};

type FaqItem = {
  answer: string;
  question: string;
};

type SiteIdentity = {
  addressLine: string;
  city: string;
  description: string;
  email: string;
  firmName: string;
  phoneDisplay: string;
  region: string;
  reviewProfiles?: Array<{
    platform?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
    reviewUrl?: string | null;
  }>;
  url: string;
};

export function buildOrganizationJsonLd(site: SiteIdentity) {
  const primaryReview = site.reviewProfiles?.find(
    (profile) =>
      typeof profile.rating === 'number' &&
      typeof profile.reviewCount === 'number' &&
      profile.reviewCount > 0
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: cleanSanityString(site.firmName),
    description: cleanSanityString(site.description),
    url: cleanSanityString(site.url),
    telephone: cleanSanityString(site.phoneDisplay),
    email: cleanSanityString(site.email),
    address: {
      '@type': 'PostalAddress',
      streetAddress: cleanSanityString(site.addressLine),
      addressLocality: cleanSanityString(site.city),
      addressRegion: cleanSanityString(site.region),
      addressCountry: 'CL',
    },
    ...(primaryReview
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: primaryReview.rating,
            reviewCount: primaryReview.reviewCount,
          },
        }
      : {}),
  };
}

export function buildLocalBusinessJsonLd(site: SiteIdentity) {
  const city = cleanSanityString(site.city);
  const region = cleanSanityString(site.region);
  const primaryReview = site.reviewProfiles?.find(
    (profile) =>
      typeof profile.rating === 'number' &&
      typeof profile.reviewCount === 'number' &&
      profile.reviewCount > 0
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: cleanSanityString(site.firmName),
    description: cleanSanityString(site.description),
    url: cleanSanityString(site.url),
    telephone: cleanSanityString(site.phoneDisplay),
    email: cleanSanityString(site.email),
    areaServed: [city, region, 'Chile'].filter(Boolean).join(', '),
    address: {
      '@type': 'PostalAddress',
      streetAddress: cleanSanityString(site.addressLine),
      addressLocality: city,
      addressRegion: region,
      addressCountry: 'CL',
    },
    ...(primaryReview
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: primaryReview.rating,
            reviewCount: primaryReview.reviewCount,
          },
        }
      : {}),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: cleanSanityString(item.label),
      item: cleanSanityString(item.path),
    })),
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: cleanSanityString(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: cleanSanityString(item.answer),
      },
    })),
  };
}
