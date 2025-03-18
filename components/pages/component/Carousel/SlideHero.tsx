"use client"

import { Suspense, useEffect, useState, memo } from "react"
import ImageBg from "../Background/ImageBg"
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
}

// Track initial load state at the component level
const initialLoadComplete = { current: false }

// Memoizar SlideHero para evitar renders innecesarios
const SlideHero = memo(function SlideHero({ slide, index, activeIndex }: SlideHeroProps) {
  const [isLoaded, setIsLoaded] = useState(initialLoadComplete.current)
  const isActive = index === activeIndex

  useEffect(() => {
    if (!initialLoadComplete.current) {
      initialLoadComplete.current = true
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="h-[500px] md:h-[650px] items-center justify-center">
      <Suspense fallback={<ImageBg imgBg={slide?.image} index={index} />}>
        {isLoaded && <AnimatedImageBg imgBg={slide?.image} index={index} isActive={isActive} />}
      </Suspense>

      <PTextHero content={slide?.content} link={slide?.ctaLinkItem} />
    </div>
  )
})

SlideHero.displayName = "SlideHero"

export default SlideHero

