'use client';
import { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import { useEffect, useRef } from 'react';

export default function ImageBg({
  imgBg,
  imgBgType,
  index,
}: {
  imgBg: ComponentProps['imageBackground'];
  imgBgType: ComponentProps['backgroundValue']['imageBackgroundType'];
  index?: number;
}) {
  const bgRef = useRef<HTMLDivElement>(null);
  const isFirst = index === 0; // Load eagerly if it's the first image

  useEffect(() => {
    if (!imgBg || !bgRef.current) return;

    const div = bgRef.current;
    const largeUrl = urlForImage(imgBg, 1920)?.url() || '/meeting.jpeg';
    const smallUrl = urlForImage(imgBg, 480)?.url() || '/meeting.jpeg';

    if (isFirst) {
      // Eagerly load based on viewport size for the first image
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      div.style.backgroundImage = `url(${isMobile ? smallUrl : largeUrl})`;
    } else {
      // Lazy load with Intersection Observer
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Choose smallUrl or largeUrl based on viewport width
              const isMobile = window.matchMedia('(max-width: 640px)').matches;
              div.style.backgroundImage = `url(${isMobile ? smallUrl : largeUrl})`;
              obs.unobserve(div);
            }
          });
        },
        { rootMargin: '200px' } // Preload 200px before entering viewport
      );

      observer.observe(div);
      return () => observer.disconnect();
    }
  }, [imgBg, imgBgType, isFirst]);

  return (
    <>
      {imgBg && imgBgType === 'dynamic' && (
        <div
          ref={bgRef}
          className="absolute inset-0 z-10 bg-cover bg-center"
        />
      )}

      {imgBg && imgBgType === 'fixed' && (
        <div
          ref={bgRef}
          className="absolute inset-0 z-10 bg-cover bg-fixed bg-center"
        />
      )}
    </>
  );
}