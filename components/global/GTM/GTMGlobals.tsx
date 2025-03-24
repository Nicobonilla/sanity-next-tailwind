'use client';

import React, { useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';

// Interfaces para tipado
interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

// Inicialización de GTM
export const initializeGTM = (gtmId: string) => {
  // Asegurarse de que dataLayer exista
  window.dataLayer = window.dataLayer || [];
  
  // Inyección de script GTM de forma manual para mayor control
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
  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

    if (gtmId) {
      // Comentar/descomentar según preferencia
      initializeGTM(gtmId);
      // O usar el componente de Next.js
      // <GoogleTagManager gtmId={gtmId} />

      // Track initial page view
      trackPageView(window.location.pathname);

      // Manejar cambios de ruta en aplicaciones SPA
      const handleRouteChange = () => {
        trackPageView(window.location.pathname);
      };

      window.addEventListener('popstate', handleRouteChange);

      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, []);

  // Renderiza el componente nativo de GTM de Next.js
  return process.env.NEXT_PUBLIC_GTM_ID ? (
    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
  ) : null;
};

export default GTMGlobals;