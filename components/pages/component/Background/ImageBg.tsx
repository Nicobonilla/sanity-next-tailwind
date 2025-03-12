'use client';

import { useState, useEffect, useRef } from 'react';
import { ComponentProps } from '@/components/types';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

export default function ImageBg({
  imgBg,
  index,
  className = "",
  sizes = '100vw',
}: {
  imgBg: ComponentProps['imageBackground'];
  index: number;
  className?: string;
  sizes?: string;
}) {
  const isPriority = index === 0;
  const [loaded, setLoaded] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimizar la URL de la imagen basado en el tamaño del contenedor
  useEffect(() => {
    // Solo ejecutar este efecto en el lado del cliente
    if (typeof window === 'undefined') return;

    const calculateOptimalSize = () => {
      // Determinar el ancho de la ventana o del contenedor si está disponible
      const viewportWidth = window.innerWidth;
      let imageWidth = 1920; // Valor predeterminado para pantallas grandes

      // Elegir el tamaño de imagen apropiado basado en el ancho de la ventana
      if (viewportWidth < 450) imageWidth = 450;
      else if (viewportWidth < 550) imageWidth = 550;
      else if (viewportWidth < 640) imageWidth = 640;
      else if (viewportWidth < 768) imageWidth = 768;
      else if (viewportWidth < 1024) imageWidth = 1024;
      else if (viewportWidth < 1536) imageWidth = 1536;

      // Generar URL optimizada con Sanity
      try {
        const src = urlForImage(imgBg)
          ?.width(imageWidth)
          ?.auto('format')
          ?.fit('max')
          ?.quality(isPriority && (imageWidth > 768) ? 80 : 60) // Calidad más alta para imágenes prioritarias
          ?.url() || '/meeting.jpeg';

        setOptimizedSrc(src);
      } catch (error) {
        console.error('Error al optimizar la imagen:', error);
        setOptimizedSrc('/meeting.jpeg');
      }
    };

    calculateOptimalSize();

    // No necesitamos un listener de redimensionamiento ya que Next/Image maneja 
    // diferentes tamaños con el atributo 'sizes'
  }, [imgBg, isPriority]);

  return (
    <div ref={containerRef} className={`relative  ${className}`}>
      {optimizedSrc && (
        <Image
          src={optimizedSrc}
          alt={'alt'}
          sizes={sizes}
          fill
          className={`absolute inset-0 object-cover `}
          priority={isPriority}
          onLoad={() => setLoaded(true)}
          loading={isPriority ? 'eager' : 'lazy'}
        />
      )}

      {/* Placeholder mientras la imagen carga */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}