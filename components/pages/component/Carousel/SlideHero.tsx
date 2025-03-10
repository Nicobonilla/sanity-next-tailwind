import { Suspense } from "react"
import Background from "../Background"
import ImageBg from "../Background/ImageBg"
import PTextHero from "../Background/PTextHero"
import type { ColorList } from "../Background/utils"
import type { ItemProps } from "@/components/types"

// Lazy load the animated version as a client component
import dynamic from "next/dynamic"
const AnimatedImageBg = dynamic(() => import("@/components/pages/component/Carousel/AnimatedImageBg"), {
  ssr: false, // Disable SSR for this component since it uses client-side animation
})

type SlideHeroProps = {
  slide: ItemProps
  layerStyle: ColorList
  index: number
  activeIndex: number
}

export default function SlideHero({ slide, layerStyle, index, activeIndex }: SlideHeroProps) {
  const isActive = index === activeIndex

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
      <Suspense fallback={<ImageBg imgBg={slide?.image} imgBgType="dynamic" index={index} />}>
        <AnimatedImageBg imgBg={slide?.image} imgBgType="dynamic" index={index} isActive={isActive} />
      </Suspense>

      <PTextHero data={{ content: slide?.content, ctaLinkItem: slide?.ctaLinkItem }} index={index} />
    </Background>
  )
}

