'use client';

import debounce from 'lodash.debounce';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  trackPageView,
  trackScrollDepth,
  trackServiceView,
} from './GTMTrackers';

export default function GTMGlobals() {
  const pathname = usePathname();
  const reachedDepths = useRef(new Set<number>());

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production' ||
      window.__asfAnalyticsConsent !== 'granted'
    ) {
      return;
    }

    reachedDepths.current.clear();

    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        return;
      }

      const scrollPercentage = Math.round(
        (scrollPosition / documentHeight) * 100
      );

      [50, 80, 90].forEach((threshold) => {
        if (
          scrollPercentage >= threshold &&
          !reachedDepths.current.has(threshold)
        ) {
          trackScrollDepth(threshold.toString());
          reachedDepths.current.add(threshold);
        }
      });
    }, 600);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [pathname]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production' ||
      !pathname ||
      window.__asfAnalyticsConsent !== 'granted'
    ) {
      return;
    }

    trackPageView(pathname);
    trackServiceView(pathname);
  }, [pathname]);

  return null;
}
