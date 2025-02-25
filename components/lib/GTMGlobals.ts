'use client';
import React, { useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import {
  trackScrollDepth,
  trackTimeOnPage,
  trackExitIntent,
  trackJavaScriptError,
  trackPageView,
} from './gtm';

export default function GTMGlobals(gtmId: { gtmId: string }) {
  useEffect(() => {
    // Inicializa Google Tag Manager
    if (process.env.NEXT_PUBLIC_GTM_ID) {
      GoogleTagManager({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }

    // Rastrea vistas de página
    trackPageView(window.location.pathname);

    // Inicialización de eventos globales
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
      trackScrollDepth(scrollDepth);
    };

    const startTime = new Date();
    const handleBeforeUnload = () => {
      const endTime = new Date();
      const timeSpent = Math.round(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // en segundos
      trackTimeOnPage(timeSpent);
    };

    const handleExitIntent = (event: MouseEvent) => {
      if (!event.relatedTarget && event.clientY <= 0) {
        trackExitIntent();
      }
    };

    const handleError = (event: ErrorEvent) => {
      trackJavaScriptError(
        event.message,
        event.filename,
        event.lineno,
        event.colno
      );
    };

    // Añadir listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('mouseout', handleExitIntent);
    window.addEventListener('error', handleError);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mouseout', handleExitIntent);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null; // Este componente no necesita renderizar nada en el DOM
}
