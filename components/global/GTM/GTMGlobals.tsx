'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Añadimos hooks de Next.js
import { GoogleTagManager } from '@next/third-parties/google';

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
  const pathname = usePathname(); // Obtiene la ruta actual
  const searchParams = useSearchParams(); // Obtiene parámetros de búsqueda

  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

    if (gtmId) {
      initializeGTM(gtmId);

      // Función para rastrear la vista de página
      const handleRouteChange = () => {
        const fullPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        trackPageView(fullPath);
      };

      // Rastrear la página inicial y los cambios de ruta
      handleRouteChange();

      // Escuchar cambios de historial (navegación atrás/adelante)
      window.addEventListener('popstate', handleRouteChange);

      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, [pathname, searchParams]); // Dependencias para reaccionar a cambios de ruta

  return process.env.NEXT_PUBLIC_GTM_ID ? (
    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
  ) : null;
};

export default GTMGlobals;