export const ANALYTICS_CONSENT_COOKIE = 'asf_analytics_consent';
export const ANALYTICS_CONSENT_STORAGE_KEY = 'asf_analytics_consent';
export const ANALYTICS_CONSENT_VERSION = '2026-04-20';

export type AnalyticsConsentState = 'granted' | 'denied' | null;

export function normalizeAnalyticsConsentState(
  value?: string | null
): AnalyticsConsentState {
  if (value === 'granted' || value === 'denied') {
    return value;
  }

  return null;
}

export function buildGoogleConsentState(
  consent: Exclude<AnalyticsConsentState, null>
) {
  return {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  } as const;
}

export function serializeConsentCookie(
  consent: Exclude<AnalyticsConsentState, null>
) {
  return `${consent}.${ANALYTICS_CONSENT_VERSION}`;
}

export function parseConsentCookie(
  value?: string | null
): AnalyticsConsentState {
  if (!value) {
    return null;
  }

  const [consent] = value.split('.');
  return normalizeAnalyticsConsentState(consent);
}
