'use client';

import Script from 'next/script';

import { useAnalyticsConsent } from '@/context/AnalyticsConsentContext';

import ConsentBanner from './ConsentBanner';
import GTMGlobals from '../lib/GTMGlobals';

export default function AnalyticsManager({
  gtmId,
}: {
  gtmId?: string;
}) {
  const { consent, trackingEnabled } = useAnalyticsConsent();

  const shouldLoadGtm = trackingEnabled && consent === 'granted' && Boolean(gtmId);

  return (
    <>
      <ConsentBanner />
      {shouldLoadGtm ? (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
          >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
          <GTMGlobals />
        </>
      ) : null}
    </>
  );
}
