'use client';
import { useEffect, useRef } from 'react';
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
  const reachedDepths = useRef(new Set());

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
      const scrollPercentage = Math.round(
        (scrollPosition / documentHeight) * 100
      );

      const thresholds = [50, 80];
      thresholds.forEach((threshold) => {
        if (
          scrollPercentage >= threshold &&
          !reachedDepths.current.has(threshold)
        ) {
          trackScrollDepth(threshold.toString());
          reachedDepths.current.add(threshold);
        }
      });
    }, 1000);

    const startTime = new Date();
    const handleBeforeUnload = (event: Event) => {
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
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return;

    if (!effectRan.current) {
      effectRan.current = true;
    }
    console.log(`Cambio de ruta detectado: ${pathname}`);
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
