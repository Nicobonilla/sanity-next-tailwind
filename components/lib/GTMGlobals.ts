'use client';
import React, { useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackExitIntent,
  trackJavaScriptError,
} from './GTMTrackers'; // Importa las funciones de eventos
import useExitIntent from '@/hooks/useExitIntent';

export default function GTMGlobals() {
  useExitIntent(trackExitIntent);
  useEffect(() => {
    // Inicializa Google Tag Manager
    if (process.env.NEXT_PUBLIC_GTM_ID) {
      GoogleTagManager({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });

      // Asegúrate de que window.dataLayer esté inicializado
      window.dataLayer = window.dataLayer || [];

      // Envía el evento de inicialización
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
    }

    // Rastrea la vista de página inicial
    trackPageView(window.location.pathname);

    // Inicialización de eventos globales
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        const scrollDepth = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100
        );
        trackScrollDepth(scrollDepth);
      }, 100); // Debouncing de 100ms
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

    // Limpieza de listeners al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mouseout', handleExitIntent);
      window.removeEventListener('error', handleError);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return null;
}
