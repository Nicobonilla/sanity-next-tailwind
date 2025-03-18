"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import type { ComponentProps } from "@/components/types"
import { urlForImage } from "@/sanity/lib/utils"
import Image from "next/image"

// Create a cache to track which images have been loaded
const loadedImagesCache = new Set<string>()

const ImageBg = memo(
  ({
    imgBg,
    index,
    className = "",
    sizes = "100vw",
  }: {
    imgBg: ComponentProps["imageBackground"]
    index: number
    className?: string
    sizes?: string
  }) => {
    const isPriority = index === 0
    const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Generate a cache key using just the index since _key is not available
    const cacheKey = `img-${index}`

    // Check if this image is already loaded from the cache
    const [loaded, setLoaded] = useState(loadedImagesCache.has(cacheKey))

    // Función optimizada con useCallback para evitar recreaciones innecesarias
    const calculateOptimalSize = useCallback(() => {
      if (typeof window === "undefined") return

      const viewportWidth = window.innerWidth
      let imageWidth = 1920

      if (viewportWidth < 450) imageWidth = 450
      else if (viewportWidth < 550) imageWidth = 550
      else if (viewportWidth < 640) imageWidth = 640
      else if (viewportWidth < 768) imageWidth = 768
      else if (viewportWidth < 1024) imageWidth = 1024
      else if (viewportWidth < 1536) imageWidth = 1536

      try {
        const src =
          urlForImage(imgBg)
            ?.width(imageWidth)
            ?.auto("format")
            ?.fit("max")
            ?.quality(isPriority && imageWidth > 768 ? 80 : 60)
            ?.url() || "/meeting.jpeg"

        setOptimizedSrc(src)
      } catch (error) {
        console.error("Error al optimizar la imagen:", error)
        setOptimizedSrc("/meeting.jpeg")
      }
    }, [imgBg, isPriority])

    useEffect(() => {
      calculateOptimalSize()
    }, [calculateOptimalSize])

    const handleImageLoad = () => {
      setLoaded(true)
      // Add this image to the cache so we know it's been loaded
      loadedImagesCache.add(cacheKey)
    }

    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {optimizedSrc && (
          <Image
            src={optimizedSrc || "/placeholder.svg"}
            alt={"alt"}
            sizes={sizes}
            fill
            className={`absolute inset-0 object-cover `}
            priority={isPriority}
            onLoad={handleImageLoad}
            loading={isPriority ? "eager" : "lazy"}
          />
        )}

        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      </div>
    )

  },)

ImageBg.displayName = "ImageBg" // Para evitar advertencias en React DevTools

export default ImageBg

