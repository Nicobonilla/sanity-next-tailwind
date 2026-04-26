export type AnalyticsPageContext = {
  page_type: string;
  content_type: string;
  city_intent: string;
  practice_area?: string;
  service_slug?: string;
  article_slug?: string;
  article_topic?: string;
};

const practiceAreaMatchers = [
  {
    value: 'familia',
    patterns: [
      'adopcion',
      'alimento',
      'custodia',
      'cuidado',
      'divorcio',
      'famil',
      'mediacion',
      'proteccion',
      'visita',
      'violencia',
    ],
  },
  {
    value: 'inmobiliario',
    patterns: [
      'arriendo',
      'compraventa',
      'conservador',
      'dominio',
      'hipoteca',
      'inmobili',
      'propiedad',
      'titulo',
      'urbanismo',
    ],
  },
  {
    value: 'herencias',
    patterns: ['herencia', 'posesion', 'sucesion', 'sucesiones'],
  },
  {
    value: 'laboral',
    patterns: ['laboral', 'trabajo'],
  },
  {
    value: 'civil',
    patterns: ['civil', 'contrato', 'litigio'],
  },
] as const;

function normalizePath(pathname?: string | null) {
  if (!pathname) {
    return '/';
  }

  try {
    const parsedUrl = new URL(pathname, 'https://www.abogadossanfelipe.cl');
    return parsedUrl.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return pathname.split('?')[0].replace(/\/+$/, '') || '/';
  }
}

function getLastPathSegment(pathname: string) {
  return pathname.split('/').filter(Boolean).at(-1) || '';
}

export function inferPracticeArea(value?: string | null) {
  const normalized = (value || '').toLowerCase();

  return practiceAreaMatchers.find((matcher) =>
    matcher.patterns.some((pattern) => normalized.includes(pattern))
  )?.value;
}

function inferCityIntent(pathname: string) {
  const normalized = pathname.toLowerCase();

  if (normalized.includes('aconcagua')) {
    return 'aconcagua';
  }

  if (normalized.includes('san-felipe') || pathname === '/') {
    return 'san_felipe';
  }

  if (normalized.includes('chile')) {
    return 'chile';
  }

  return 'unspecified';
}

export function inferAnalyticsPageContext(
  pathname?: string | null
): AnalyticsPageContext {
  const path = normalizePath(pathname);
  const slug = getLastPathSegment(path);

  if (path === '/') {
    return {
      page_type: 'home',
      content_type: 'transactional',
      city_intent: 'san_felipe',
    };
  }

  if (path === '/blog') {
    return {
      page_type: 'blog_index',
      content_type: 'informational',
      city_intent: inferCityIntent(path),
    };
  }

  if (path.startsWith('/blog/')) {
    return {
      page_type: 'blog',
      content_type: 'informational',
      city_intent: inferCityIntent(path),
      practice_area: inferPracticeArea(slug),
      article_slug: slug,
      article_topic: inferPracticeArea(slug) || 'legal',
    };
  }

  if (path.startsWith('/services/')) {
    return {
      page_type: 'service',
      content_type: 'transactional',
      city_intent: inferCityIntent(path),
      practice_area: inferPracticeArea(slug),
      service_slug: slug,
    };
  }

  if (path.startsWith('/area-de-practica/')) {
    return {
      page_type: 'practice_area',
      content_type: 'transactional',
      city_intent: inferCityIntent(path),
      practice_area: inferPracticeArea(slug),
    };
  }

  if (path === '/politica-de-cookies' || path === '/politica-de-privacidad') {
    return {
      page_type: 'policy',
      content_type: 'legal',
      city_intent: 'unspecified',
    };
  }

  return {
    page_type: 'page',
    content_type: 'transactional',
    city_intent: inferCityIntent(path),
    practice_area: inferPracticeArea(slug),
  };
}

export function inferCtaLocation(source: string) {
  const normalized = source.toLowerCase();

  if (normalized.includes('hero')) return 'hero';
  if (normalized.includes('sticky')) return 'sticky';
  if (normalized.includes('footer')) return 'footer';
  if (normalized.includes('final_cta')) return 'final_cta';
  if (normalized.includes('quick_actions')) return 'quick_actions';
  if (normalized.includes('contact_routes')) return 'contact_routes';
  if (normalized.includes('landing')) return 'landing';
  if (normalized.includes('nav')) return 'nav';
  if (normalized.includes('faq')) return 'faq';
  if (normalized.includes('blog')) return 'blog';
  if (normalized.includes('service')) return 'service';

  return source;
}

export function inferServiceSlugFromSource(source: string) {
  const match = source.match(
    /^service_([^_]+?)(?:_(?:booking|landing|phone|quick_actions|reviews|whatsapp)|$)/
  );

  return match?.[1];
}
