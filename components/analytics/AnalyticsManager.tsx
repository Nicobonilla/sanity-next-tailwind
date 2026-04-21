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
            id="legacy-consent-guard"
            strategy="afterInteractive"
          >{`(function(){var pattern=/iubenda\\.(com|net)/i;var attrPattern=/cdn\\.iubenda\\.com|cs\\.iubenda\\.com|idb\\.iubenda\\.com/i;function shouldBlock(value){return typeof value==='string'&&(pattern.test(value)||attrPattern.test(value));}function removeLegacyNode(node){if(!node||typeof node!=='object'){return false;}var tag=node.tagName;var target=tag==='LINK'?node.href:node.src;if((tag==='SCRIPT'||tag==='IFRAME'||tag==='IMG'||tag==='LINK')&&shouldBlock(target)){try{node.remove();}catch{}return true;}return false;}function patch(proto,method){if(!proto||typeof proto[method]!=='function'||proto[method].__asfPatched){return;}var original=proto[method];var wrapped=function(){var node=arguments[0];if(removeLegacyNode(node)){return node;}return original.apply(this,arguments);};wrapped.__asfPatched=true;proto[method]=wrapped;}function clearLegacyCookies(){if(typeof document==='undefined'){return;}var hostname=window.location.hostname;var domains=[undefined,hostname];if(hostname.split('.').length>2){domains.push('.'+hostname.split('.').slice(-2).join('.'));}else{domains.push('.'+hostname);}var names=document.cookie.split(';').map(function(part){return part.trim().split('=')[0];}).filter(function(name){return /^(_iub|iubenda)/i.test(name);});names.forEach(function(name){domains.forEach(function(domain){document.cookie=name+'=; Path=/; Max-Age=0; SameSite=Lax'+(domain?'; Domain='+domain:'');});});}patch(Node.prototype,'appendChild');patch(Node.prototype,'insertBefore');document.querySelectorAll('script[src*=\"iubenda\"],iframe[src*=\"iubenda\"],img[src*=\"iubenda\"],link[href*=\"iubenda\"]').forEach(removeLegacyNode);new MutationObserver(function(mutations){mutations.forEach(function(mutation){mutation.addedNodes.forEach(removeLegacyNode);});}).observe(document.documentElement,{childList:true,subtree:true});try{delete window._iub;}catch{}window._iub=undefined;clearLegacyCookies();})();`}</Script>
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
