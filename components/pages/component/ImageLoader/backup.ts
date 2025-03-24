"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import type { ComponentProps } from "@/components/types"
import Image from "next/image"
import { shouldLoadHighResImage, calculateOptimalImageSize } from "./utils"
import { urlForImage } from "@/sanity/lib/utils"

export default function DesktopImageEnhancer({
  imgBg,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  imgBg?: ComponentProps["imageBackground"] | null
  className?: string
  sizes?: string
  priority: boolean
}) {
  const [imageSize, setImageSize] = useState<number | null>(null)
  const [optimizedImageUrl, setOptimizedImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null)
  const hasImage = !!imgBg?.asset?._ref
  const [isVisible, setIsVisible] = useState(false)

  // Efecto para medir el contenedor y calcular el tamaño óptimo de la imagen
  useEffect(() => {
    if (!hasImage || typeof window === "undefined") return

    // Verificar si debemos cargar una imagen de alta resolución
    if (!shouldLoadHighResImage(window.innerWidth)) {
      return // No mejorar la imagen en pantallas pequeñas
    }

    const calculateImageSize = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const targetWidth = calculateOptimalImageSize(containerWidth);
      setImageSize(targetWidth);

      try {
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limita a 2x
        const url =
          urlForImage(imgBg)
            ?.width(targetWidth)
            .quality(75)
            .auto("format")
            .dpr(dpr) // Ajusta según DPR del dispositivo
            .url() || null;
        setOptimizedImageUrl(url);
      } catch (error) {
        console.error("Error al obtener la URL de la imagen:", error);
        setOptimizedImageUrl(null);
      }
    };

    calculateImageSize()

    const handleResize = () => {
      // Debounce para evitar cálculos excesivos durante el redimensionamiento
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(calculateImageSize)
      } else {
        calculateImageSize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [imgBg, hasImage, sizes])

  // Efecto para observar la visibilidad del contenedor
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "250px" }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const currentImage = event.target as HTMLImageElement
    const parentElement = currentImage.parentElement?.parentElement

    if (!parentElement || !imageSize) return

    // Buscar todas las imágenes en el contenedor padre
    const allImages = parentElement.querySelectorAll("img")

    // Remover imágenes de menor resolución del DOM (en lugar de solo ocultarlas)
    allImages.forEach((img) => {
      if (img !== currentImage) {
        const imgSize = Number.parseInt(img.getAttribute("data-image-size") || "0", 10)
        if (imgSize === 0 || imgSize < imageSize) {
          img.parentElement?.removeChild(img) // Eliminar del DOM
        }
      }
    })
  }

  // No renderizar nada si no hay imagen optimizada o si no es visible
  if (!optimizedImageUrl || !hasImage || !imageSize || !isVisible) {
    return null
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Image
        src={optimizedImageUrl}
        alt="Background image"
        fill
        priority={priority}
        quality={75}
        className={`absolute inset-0 size-full object-cover ${className}`}
        onLoad={handleImageLoad}
        sizes={sizes}
        loading="lazy"
        data-image-size={imageSize}
      />
    </div>
  )
}