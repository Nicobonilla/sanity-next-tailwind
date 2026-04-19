import { stegaClean } from '@sanity/client/stega';

export function cleanSanityValue<T>(value: T): T {
  return stegaClean(value);
}

export function cleanSanityString(value?: string | null): string | undefined {
  if (value == null) {
    return undefined;
  }

  const cleaned = stegaClean(value);

  if (typeof cleaned !== 'string') {
    return undefined;
  }

  const normalized = cleaned.trim();
  return normalized || undefined;
}
