"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { ComponentProps } from "@/components/types";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import { useMaxWindowWidth } from "../../../../hooks/useMaxWindowWidth";
import { calculateOptimalImageSize } from "./utils";
import clsx from "clsx";

export default function DesktopImageEnhancer({
  imgBg,
  className = "",
  sizes = "100vw",
  priority,
}: {
  imgBg?: ComponentProps["imageBackground"] | null;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
  const [isCharged, setIsCharged] = useState(false);
  const [currentSize, setCurrentSize] = useState<number>(1920);

  const maxWidth = useMaxWindowWidth();
  const hasImage = !!imgBg?.asset?._ref;

  // Memoizamos la generación de la URL para evitar recalcularla innecesariamente
  const generateOptimizedSrc = useCallback(
    (width: number) => {
      try {
        return (
          urlForImage(imgBg)
            ?.width(width)
            .auto("format")
            .fit("max")
            .quality(70)
            .url() || "/meeting.jpeg"
        );
      } catch (error) {
        console.error("Error al optimizar la imagen para desktop:", error);
        return "/placeholder.svg";
      }
    },
    [imgBg]
  );

  // Memoizamos el cálculo de optimalSize para evitar recalcularlo innecesariamente
  const optimalSize = useMemo(() => {
    if (!hasImage || maxWidth < 640) return currentSize; // Evita cálculos si no hay imagen o el ancho es pequeño
    return calculateOptimalImageSize(maxWidth);
  }, [maxWidth, hasImage, currentSize]);

  useEffect(() => {
    setIsCharged(true);
  }, []);

  useEffect(() => {
    if (!isCharged || !hasImage || maxWidth < 640) return;
    if (optimalSize === currentSize) return; // Evita re-renders innecesarios
    const src = generateOptimizedSrc(optimalSize);
    setOptimizedSrc(src);
    setCurrentSize(optimalSize);
  }, [maxWidth, isCharged, hasImage, currentSize, generateOptimizedSrc, optimizedSrc]);

  const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const loadedImg = event.currentTarget;
    const parentElement = loadedImg.parentElement;

    if (parentElement) {
      const previousImages = parentElement.querySelectorAll(
        `img[class*='img-']:not(.img-${currentSize})`
      );
      previousImages.forEach((img) => {
        if (img !== loadedImg) {
          console.log(`Eliminando imagen anterior con clase: ${img.className}`); // Opcional
          img.remove();
        }
      });
    }
  }, [currentSize]);

  if (!optimizedSrc || !hasImage) return null;

  return (
    <Image
      src={optimizedSrc}
      alt={"Background image (high quality)"}
      sizes={sizes}
      fill
      className={clsx("object-cover", className, "img-" + currentSize)}
      onLoad={handleImageLoad}
      priority={priority}
      placeholder="empty" // No usamos blur aquí para evitar conflictos con la imagen inicial
    />
  );
}