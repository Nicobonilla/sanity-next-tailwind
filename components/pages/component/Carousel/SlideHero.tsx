import { Suspense, useEffect, useState } from "react"
import Background from "../Background"
import ImageBg from "../Background/ImageBg"
import PTextHero from "../Background/PTextHero"
import type { ItemProps } from "@/components/types"

// Lazy load the animated version as a client component
import dynamic from "next/dynamic"
import type { ColorItem } from "@/sanity.types"
const AnimatedImageBg = dynamic(() => import("@/components/pages/component/Carousel/AnimatedImageBg"), {
  ssr: false, // Disable SSR for this component since it uses client-side animation
})

type SlideHeroProps = {
  slide: ItemProps
  layerStyle: ColorItem[]
  index: number
  activeIndex: number
}

export default function SlideHero({ slide, layerStyle, index, activeIndex }: SlideHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const isActive = index === activeIndex
  useEffect(() => {
    // Use lazy loading or intersection observer logic here if needed.
    // When the component or image is fully loaded, set isLoaded to true
    setIsLoaded(true)
  }, [])
  return (
    <Background
      data={{
        ...slide,
        typeComponent: "carousel",
        variant: "hero",
        colors: layerStyle,
      }}
    >
      {/* Only show the animated version */}
      <Suspense fallback={<ImageBg imgBg={slide?.image} index={index} />}>
        {isLoaded &&
          <AnimatedImageBg imgBg={slide?.image} index={index} isActive={isActive} />}
      </Suspense>

      <PTextHero content={slide?.content} link={slide?.ctaLinkItem} />
    </Background>
  )
}

