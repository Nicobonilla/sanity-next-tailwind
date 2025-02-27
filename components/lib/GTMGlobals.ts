'use client';
import React, { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackExitIntent,
  trackJavaScriptError,
} from './GTMTrackers';
import useExitIntent from '@/hooks/useExitIntent';
import { usePathname } from 'next/navigation';

export default function GTMGlobals() {
  useExitIntent(trackExitIntent);
  const effectRan = useRef(false);
  const pathname = usePathname(); 

  /** 🚀 1. Inicialización de GTM y eventos globales */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('GTMGlobals montado');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
    }

    // Evitar doble ejecución en strict mode
    if (effectRan.current) return;
    effectRan.current = true;
    trackPageView(window.location.pathname);

    let scrollTimeout: number | undefined;

    const handleScroll = debounce(() => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        const scrollDepth = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100
        );
        trackScrollDepth(scrollDepth);
      }, 200);
    });

    const startTime = new Date();
    const handleBeforeUnload = () => {
      const endTime = new Date();
      const timeSpent = Math.round(
        (endTime.getTime() - startTime.getTime()) / 1000
      );
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
    window.onerror = (message, source, lineno, colno, error) => {
      trackJavaScriptError(
        String(message),
        String(source),
        lineno || 0,
        colno || 0
      );
    };

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

  /** 🚀 2. Detectar cambios de ruta con `usePathname` */
  useEffect(() => {
    if (pathname) {
      console.log(`Cambio de ruta detectado: ${pathname}`);
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
