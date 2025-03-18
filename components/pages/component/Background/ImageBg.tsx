'use client';

import { useState, useEffect, useRef, useCallback, memo } from "react";
import type { ComponentProps } from "@/components/types";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";

// Global registry to track which images have been loaded
const loadedImagesRegistry = new Map<string, boolean>();

const ImageBg = memo(
  ({
    imgBg,
    index,
    className = "",
    sizes = "100vw",
    showSkeleton = false,
    onLoad,
  }: {
    imgBg: ComponentProps["imageBackground"];
    index: number;
    className?: string;
    sizes?: string;
    showSkeleton?: boolean;
    onLoad?: () => void;
  }) => {
    const isPriority = index === 0;
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(isPriority || !isMobile); // Cargar inmediatamente en desktop
    const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate a unique key for this image
    const imageKey = `img-${imgBg?.asset?._ref}`;

    // Check if this image is already in the registry
    useEffect(() => {
      if (loadedImagesRegistry.has(imageKey)) {
        setLoaded(true);
      }
    }, [imageKey]);

    // Detect if we're on mobile
    useEffect(() => {
      const checkMobile = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        
        // Si no es móvil, cargar la imagen inmediatamente
        if (!mobile) {
          setShouldLoad(true);
        }
      };
      
      // Ejecutar al montar
      checkMobile();
      
      // Actualizar en cambios de tamaño
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Set up true lazy loading with IntersectionObserver ONLY for mobile
    useEffect(() => {
      // Si no es móvil o ya debería cargar, no usar IntersectionObserver
      if (!containerRef.current || !isMobile || isPriority || shouldLoad) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          // Start loading when image is 300px away from viewport
          rootMargin: "300px",
          threshold: 0.01,
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [isMobile, isPriority, shouldLoad]);

    // Función optimizada con useCallback para evitar recreaciones innecesarias
    const calculateOptimalSize = useCallback(() => {
      if (typeof window === "undefined" || !shouldLoad || !imgBg?.asset?._ref) return;

      const viewportWidth = window.innerWidth;
      let imageWidth = 1920;

      if (viewportWidth < 450) imageWidth = 450;
      else if (viewportWidth < 550) imageWidth = 550;
      else if (viewportWidth < 640) imageWidth = 640;
      else if (viewportWidth < 768) imageWidth = 768;
      else if (viewportWidth < 1024) imageWidth = 1024;
      else if (viewportWidth < 1536) imageWidth = 1536;

      // Calidad más alta para desktop
      const quality = isMobile ? 60 : (isPriority ? 80 : 70);

      try {
        const src =
          urlForImage(imgBg)
            ?.width(imageWidth)
            ?.auto("format")
            ?.fit("max")
            ?.quality(quality)
            ?.url() || "/meeting.jpeg";

        setOptimizedSrc(src);
      } catch (error) {
        console.error("Error al optimizar la imagen:", error);
        setOptimizedSrc("/meeting.jpeg");
      }
    }, [imgBg, isPriority, shouldLoad, isMobile]);

    // Only calculate image URL when we should load the image
    useEffect(() => {
      if (shouldLoad) {
        calculateOptimalSize();
      }
    }, [calculateOptimalSize, shouldLoad]);

    const handleImageLoad = () => {
      setLoaded(true);
      // Add to registry so we know it's loaded
      loadedImagesRegistry.set(imageKey, true);
      if (onLoad) {
        onLoad();
      }
    };

    // Verificar si hay una imagen para mostrar
    const hasImage = !!imgBg?.asset?._ref;

    return (
      <div ref={containerRef} className={`relative w-full h-full ${className}`}>
        {/* Mostrar un mensaje de depuración si no hay imagen */}
        {!hasImage && <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-700">No image available</div>}
        
        {/* Only render the Image component when shouldLoad is true and we have an image */}
        {optimizedSrc && shouldLoad && hasImage && (
          <Image
            src={optimizedSrc}
            alt={"Background image"}
            sizes={sizes}
            fill
            className="absolute inset-0 object-cover w-full h-full"
            priority={isPriority}
            onLoad={handleImageLoad}
            loading={isPriority ? "eager" : "lazy"}
          />
        )}

        {/* Show skeleton if image should be visible but hasn't loaded yet */}
        {(!loaded || showSkeleton) && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    );
  }
);

ImageBg.displayName = "ImageBg";

export default ImageBg;
