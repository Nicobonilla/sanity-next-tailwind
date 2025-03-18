"use client"

import { Suspense, useEffect, useState, memo } from "react"
import PTextHero from "../Background/PTextHero"
import type { ItemProps } from "@/components/types"

// Lazy load de la versión animada como componente cliente
import dynamic from "next/dynamic"

const AnimatedImageBg = dynamic(() => import("@/components/pages/component/Carousel/AnimatedImageBg"), {
  ssr: false,
})

type SlideHeroProps = {
  slide: ItemProps
  index: number
  activeIndex: number
  isLoaded?: boolean
  onLoad?: () => void
}

// Memoizar SlideHero para evitar renders innecesarios
const SlideHero = memo(function SlideHero({ slide, index, activeIndex, isLoaded = false, onLoad }: SlideHeroProps) {
  const [componentLoaded, setComponentLoaded] = useState(false)
  const isActive = index === activeIndex

  useEffect(() => {
    setComponentLoaded(true)

    // If this is the active slide and it's not marked as loaded yet, mark it as loaded
    if (isActive && !isLoaded && onLoad) {
      onLoad()
    }
  }, [isActive, isLoaded, onLoad])

  // Only show skeleton on initial load for this slide
  const showSkeleton = !isLoaded

  return (
    <div className="h-[500px] md:h-[650px] items-center justify-center">
      <Suspense fallback={showSkeleton ? <div className="absolute inset-0 bg-gray-200 animate-pulse" /> : null}>
        {(componentLoaded || isLoaded) && (
          <AnimatedImageBg
            imgBg={slide?.image}
            index={index}
            isActive={isActive}
            onLoad={onLoad || (() => { })}
            showSkeleton={showSkeleton}
          />
        )}
      </Suspense>

      <PTextHero content={slide?.content} link={slide?.ctaLinkItem} />
    </div>
  )
})
SlideHero.displayName = "SlideHero"

export default SlideHero

