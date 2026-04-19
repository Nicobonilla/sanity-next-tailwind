'use client';

import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import {
  trackExitIntent,
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from './GTMTrackers';
import { usePathname } from 'next/navigation';

export default function GTMGlobals() {
  const effectRan = useRef(false);
  const pathname = usePathname();
  const reachedDepths = useRef(new Set<number>());

  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round(
        (scrollPosition / documentHeight) * 100
      );

      [50, 80].forEach((threshold) => {
        if (
          scrollPercentage >= threshold &&
          !reachedDepths.current.has(threshold)
        ) {
          trackScrollDepth(threshold.toString());
          reachedDepths.current.add(threshold);
        }
      });
    }, 1000);

    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
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
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production' ||
      !pathname
    ) {
      return;
    }

    if (!effectRan.current) {
      effectRan.current = true;
    }

    trackPageView(pathname);
  }, [pathname]);

  return null;
}
