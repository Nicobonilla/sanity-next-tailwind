'use client';
import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackExitIntent,
} from './GTMTrackers';
import { usePathname } from 'next/navigation';

export default function GTMGlobals() {
  const effectRan = useRef(false);
  const pathname = usePathname();
  const [lastScrollPercentage, setLastScrollPercentage] = useState<
    number | null
  >(null);

  // Efecto global que se ejecuta solo una vez
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log('GTMGlobals montado - Inicialización única');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;

      // Calcular la profundidad del desplazamiento en porcentajes
      const scrollPercentage = Math.round(
        (scrollPosition / documentHeight) * 100
      );

      // Enviar eventos de scroll en 25%, 50%, 75% y 100% solo si el porcentaje cambia
      if (scrollPercentage !== lastScrollPercentage) {
        setLastScrollPercentage(scrollPercentage);
        if (scrollPercentage >= 25 && scrollPercentage < 50) {
          trackScrollDepth('scroll_25');
        } else if (scrollPercentage >= 50 && scrollPercentage < 75) {
          trackScrollDepth('scroll_50');
        } else if (scrollPercentage >= 75 && scrollPercentage < 100) {
          trackScrollDepth('scroll_75');
        } else if (scrollPercentage === 100) {
          trackScrollDepth('scroll_100');
        }
      }
    }, 1000); // Ajusta el debounce a un valor mayor si es necesario

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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('mouseout', handleExitIntent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mouseout', handleExitIntent);
    };
  }, [lastScrollPercentage]); // Dependencia en lastScrollPercentage

  // Efecto para rastrear cambios de ruta
  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return;

    if (!effectRan.current) {
      effectRan.current = true; // Evita doble ejecución inicial
    }
    console.log(`Cambio de ruta detectado: ${pathname}`);
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
