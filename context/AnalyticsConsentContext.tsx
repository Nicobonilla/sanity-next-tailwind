'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ANALYTICS_CONSENT_COOKIE,
  ANALYTICS_CONSENT_STORAGE_KEY,
  AnalyticsConsentState,
  buildGoogleConsentState,
  normalizeAnalyticsConsentState,
  parseConsentCookie,
  serializeConsentCookie,
} from '@/lib/analytics-consent';

type AnalyticsConsentContextValue = {
  bannerOpen: boolean;
  consent: AnalyticsConsentState;
  hasDecision: boolean;
  trackingEnabled: boolean;
  acceptConsent: () => void;
  rejectConsent: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const AnalyticsConsentContext = createContext<
  AnalyticsConsentContextValue | undefined
>(undefined);

function applyConsentToWindow(consent: Exclude<AnalyticsConsentState, null>) {
  if (typeof window === 'undefined') {
    return;
  }

  window.__asfAnalyticsConsent = consent;
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', buildGoogleConsentState(consent));
  }
}

function persistConsent(consent: Exclude<AnalyticsConsentState, null>) {
  const cookieValue = serializeConsentCookie(consent);

  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${cookieValue}; Path=/; Max-Age=31536000; SameSite=Lax`;
  window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, cookieValue);
  applyConsentToWindow(consent);
}

function expireCookie(name: string, domain?: string) {
  const domainSegment = domain ? `; Domain=${domain}` : '';
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domainSegment}`;
}

function clearGoogleMeasurementCookies() {
  if (typeof document === 'undefined') {
    return;
  }

  const hostname = window.location.hostname;
  const domainCandidates = [undefined, hostname];

  if (hostname.split('.').length > 2) {
    domainCandidates.push(`.${hostname.split('.').slice(-2).join('.')}`);
  } else {
    domainCandidates.push(`.${hostname}`);
  }

  const cookieNames = ['_ga', '_gid', '_gat', '_gcl_au'];

  cookieNames.forEach((name) => {
    domainCandidates.forEach((domain) => expireCookie(name, domain));
  });

  document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => /^_ga_/.test(name) || /^_gcl_/.test(name))
    .forEach((name) => {
      domainCandidates.forEach((domain) => expireCookie(name, domain));
    });
}

function clearLegacyConsentCookies() {
  if (typeof document === 'undefined') {
    return;
  }

  const hostname = window.location.hostname;
  const domainCandidates = [undefined, hostname];

  if (hostname.split('.').length > 2) {
    domainCandidates.push(`.${hostname.split('.').slice(-2).join('.')}`);
  } else {
    domainCandidates.push(`.${hostname}`);
  }

  document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => /^(_iub|iubenda)/i.test(name))
    .forEach((name) => {
      domainCandidates.forEach((domain) => expireCookie(name, domain));
    });
}

export function AnalyticsConsentProvider({
  children,
  initialConsent,
  trackingEnabled,
}: {
  children: ReactNode;
  initialConsent: AnalyticsConsentState;
  trackingEnabled: boolean;
}) {
  const [consent, setConsent] = useState<AnalyticsConsentState>(initialConsent);
  const [bannerOpen, setBannerOpen] = useState(
    trackingEnabled && initialConsent === null
  );

  useEffect(() => {
    if (!trackingEnabled || typeof window === 'undefined') {
      return;
    }

    window.__asfTrackingEnabled = trackingEnabled;

    const storedConsent = normalizeAnalyticsConsentState(
      parseConsentCookie(
        window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
      )
    );

    if (storedConsent && storedConsent !== consent) {
      setConsent(storedConsent);
      setBannerOpen(false);
      applyConsentToWindow(storedConsent);
      return;
    }

    if (consent) {
      applyConsentToWindow(consent);
    }
  }, [consent, trackingEnabled]);

  const acceptConsent = () => {
    setConsent('granted');
    setBannerOpen(false);
    persistConsent('granted');
  };

  const rejectConsent = () => {
    setConsent('denied');
    setBannerOpen(false);
    persistConsent('denied');
    clearGoogleMeasurementCookies();
    clearLegacyConsentCookies();
  };

  const value = useMemo(
    () => ({
      bannerOpen,
      consent,
      hasDecision: consent !== null,
      trackingEnabled,
      acceptConsent,
      rejectConsent,
      openPreferences: () => {
        if (trackingEnabled) {
          setBannerOpen(true);
        }
      },
      closePreferences: () => setBannerOpen(false),
    }),
    [bannerOpen, consent, trackingEnabled]
  );

  return (
    <AnalyticsConsentContext.Provider value={value}>
      {children}
    </AnalyticsConsentContext.Provider>
  );
}

export function useAnalyticsConsent() {
  const context = useContext(AnalyticsConsentContext);

  if (!context) {
    throw new Error(
      'useAnalyticsConsent must be used within AnalyticsConsentProvider'
    );
  }

  return context;
}
