'use client';

import { AnalyticsConsentState } from '@/lib/analytics-consent';
import { ThemeProvider } from '@/context/ThemeContext';
import { AnalyticsConsentProvider } from './AnalyticsConsentContext';
import { ContactDrawerProvider } from './ContactDrawerContext';
import { DrawerNavProvider } from './DrawerNavContext';

interface ProvidersProps {
  children: React.ReactNode;
  withDarkMode: boolean;
  initialAnalyticsConsent: AnalyticsConsentState;
  trackingEnabled: boolean;
}

export default function Providers({
  children,
  withDarkMode,
  initialAnalyticsConsent,
  trackingEnabled,
}: ProvidersProps) {
  const content = (
    <AnalyticsConsentProvider
      initialConsent={initialAnalyticsConsent}
      trackingEnabled={trackingEnabled}
    >
      <ContactDrawerProvider>
        <DrawerNavProvider>{children}</DrawerNavProvider>
      </ContactDrawerProvider>
    </AnalyticsConsentProvider>
  );

  if (!withDarkMode) {
    return content;
  }

  return (
    <ThemeProvider withDarkMode={withDarkMode}>
      {content}
    </ThemeProvider>
  );
}
