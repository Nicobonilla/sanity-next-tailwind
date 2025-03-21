"use client"
import { useEffect, useRef } from "react"

type AnimatedPortalsProps = {
  imageContainers: HTMLElement[]
  activeIndex: number
}

export default function AnimatedPortals({ imageContainers, activeIndex }: AnimatedPortalsProps) {
  const prevIndexRef = useRef(activeIndex)

  useEffect(() => {
    if (!imageContainers.length) return

    // Store the previous index to handle transitions
    const prevIndex = prevIndexRef.current
    prevIndexRef.current = activeIndex

    imageContainers.forEach((container) => {
      if (!container) return

      const dataKey = Number.parseInt(container.getAttribute("data-key") || "0", 10)
      const isActive = activeIndex === dataKey
      const wasActive = prevIndex === dataKey

      // Find the image inside the container
      const img = container.querySelector("img")
      if (!img) return

      // Remove any existing active-slide class
      img.classList.remove("active-slide")

      // Apply active-slide class to the active slide
      if (isActive) {
        img.classList.add("active-slide")
      }

      // For non-active slides, ensure they're at the base scale
      if (!isActive && !wasActive) {
        img.style.transform = "scale(1)"
        img.style.opacity = "0.9"
      }
    })
  }, [activeIndex, imageContainers])

  return null
}

