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
    name: site.firmName,
    description: site.description,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addressLine,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: 'CL',
    },
  };
}

export function buildLocalBusinessJsonLd(site: SiteIdentity) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.firmName,
    description: site.description,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    areaServed: `${site.city}, ${site.region}, Chile`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addressLine,
      addressLocality: site.city,
      addressRegion: site.region,
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
      name: item.label,
      item: item.path,
    })),
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
