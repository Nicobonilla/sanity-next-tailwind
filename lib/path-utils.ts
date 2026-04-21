const INVALID_SEGMENT = /^\[object\s*object\]$/i;

export function normalizePathSegment(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');

  if (!trimmed || INVALID_SEGMENT.test(trimmed)) {
    return null;
  }

  return trimmed;
}

export function buildContentPath(prefix: string, slug: unknown) {
  const normalizedPrefix = prefix.replace(/\/+$/, '') || '/';
  const normalizedSlug = normalizePathSegment(slug);

  if (!normalizedSlug) {
    return null;
  }

  return `${normalizedPrefix}/${normalizedSlug}`;
}
