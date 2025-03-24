'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Interfaces para tipado
interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

// Inicialización de GTM
export const initializeGTM = (gtmId: string) => {
  window.dataLayer = window.dataLayer || [];
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,l,i){
      w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
  document.head.appendChild(script);
};

// Función principal para enviar eventos
export const sendGTMEvent = (eventData: GTMEvent) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

// Eventos específicos siguiendo la nomenclatura de GA4
export const trackPageView = (page_path: string) => {
  sendGTMEvent({
    event: 'page_view',
    page_path,
    page_title: document.title,
    page_location: window.location.href,
  });
};

export const trackFormSubmit = (form_id: string, form_name?: string) => {
  sendGTMEvent({
    event: 'form_submit',
    form_id,
    form_name,
    page_location: window.location.href,
  });
};

export const trackClick = (
  element_id: string,
  element_text?: string,
  element_type: string = 'button'
) => {
  sendGTMEvent({
    event: 'click',
    element_id,
    element_text,
    element_type,
    page_location: window.location.href,
  });
};

// Componente de Inicialización de GTM
const GTMGlobals: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (gtmId) {
      initializeGTM(gtmId);

      const trackCurrentPage = () => {
        const fullPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        trackPageView(fullPath);
      };

      // Track initial page load
      trackCurrentPage();

      // Listen for navigation changes
      window.addEventListener('popstate', trackCurrentPage);

      return () => {
        window.removeEventListener('popstate', trackCurrentPage);
      };
    }
  }, [pathname, searchParams]);

  return null; // No need for <GoogleTagManager /> here since GTMWrapper handles it
};

export default GTMGlobals;