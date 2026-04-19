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
  url: string;
};

export function buildOrganizationJsonLd(site: SiteIdentity) {
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
  };
}

export function buildLocalBusinessJsonLd(site: SiteIdentity) {
  const city = cleanSanityString(site.city);
  const region = cleanSanityString(site.region);

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
