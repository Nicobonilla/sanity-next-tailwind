"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import type { ComponentProps } from "@/components/types"
import { urlForImage } from "@/sanity/lib/utils"
import Image from "next/image"

const ImageBg = memo(
  ({
    imgBg,
    index,
    className = "",
    sizes = "100vw",
    showSkeleton = false,
    onLoad,
  }: {
    imgBg: ComponentProps["imageBackground"]
    index: number
    className?: string
    sizes?: string
    showSkeleton?: boolean
    onLoad?: () => void
  }) => {
    const isPriority = index === 0
    const [loaded, setLoaded] = useState(false)
    const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

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

    // Set up intersection observer to detect when the image is about to enter the viewport
    useEffect(() => {
      if (!containerRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsIntersecting(true)
              // Once we've detected it's in view, we don't need to observe anymore
              observer.disconnect()
            }
          })
        },
        {
          // Start loading the image when it's 200px away from entering the viewport
          rootMargin: "200px",
          threshold: 0.01,
        },
      )

      observer.observe(containerRef.current)

      return () => {
        observer.disconnect()
      }
    }, [])

    // Only calculate and load the image when it's about to be visible or is marked for preloading
    useEffect(() => {
      // Load if it's the first image (priority), if it's intersecting with viewport, or if it's explicitly marked for loading
      if (isPriority || isIntersecting || showSkeleton === false) {
        calculateOptimalSize()
      }
    }, [calculateOptimalSize, isPriority, isIntersecting, showSkeleton])

    const handleImageLoad = () => {
      setLoaded(true)
      if (onLoad) {
        onLoad()
      }
    }

    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {optimizedSrc && (isIntersecting || isPriority || showSkeleton === false) && (
          <Image
            src={optimizedSrc || "/placeholder.svg"}
            alt={"alt"}
            sizes={sizes}
            fill
            className={`absolute inset-0 object-cover`}
            priority={isPriority}
            onLoad={handleImageLoad}
            loading={isPriority ? "eager" : "lazy"}
          />
        )}

        {/* Only show skeleton if explicitly requested and image isn't loaded yet */}
        {(showSkeleton || !loaded) && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      </div>
    )
  },
)

ImageBg.displayName = "ImageBg" // Para evitar advertencias en React DevTools

export default ImageBg

