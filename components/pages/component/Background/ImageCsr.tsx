'use client';
import { useState, useEffect, memo } from 'react';
import type { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

type ImageBgProps = {
  lcp?: React.ReactNode;
  imgBg: ComponentProps['imageBackground'];
  index: number;
  className?: string;
  sizes?: string;
  onLoad?: () => void;
};

const ImageBgCsr = memo(function ImageBg({
  lcp,
  imgBg,
  index,
  className = '',
  sizes = '100vw',
  onLoad,
}: ImageBgProps) {
  const isPriority = index === 0;
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const hasImage = !!imgBg?.asset?._ref;

  // Ajustar resolución solo para pantallas grandes
  const adjustResolutionForDesktop = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) return lcp; // No ajustar si es móvil

    let imageWidth = 1920;
    if (viewportWidth < 1024) imageWidth = 1024;
    else if (viewportWidth < 1536) imageWidth = 1536;

    try {
      const src = urlForImage(imgBg)
        ?.width(imageWidth)
        ?.auto('format')
        ?.fit('max')
        ?.quality(70)
        ?.url() || '/meeting.jpeg';
      setOptimizedSrc(src);
    } catch (error) {
      console.error('Error al optimizar la imagen para desktop:', error);
      setOptimizedSrc('/meeting.jpeg');
    }
  };

  // Verificar tamaño de pantalla después de cargar CSR
  useEffect(() => {
    adjustResolutionForDesktop();
    const handleResize = () => adjustResolutionForDesktop();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imgBg]);

  const handleImageLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!hasImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-700">
          No image available
        </div>
      )}
      {optimizedSrc && hasImage && (
        <Image
          src={optimizedSrc}
          alt="Background image"
          sizes={sizes}
          fill
          className="absolute inset-0 object-cover w-full h-full"
          priority={isPriority}
          onLoad={handleImageLoad}
          loading={isPriority ? 'eager' : 'lazy'}
        />
      )}
      {!loaded && hasImage && !optimizedSrc && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
});

ImageBgCsr.displayName = 'ImageBg';
export default ImageBgCsr;