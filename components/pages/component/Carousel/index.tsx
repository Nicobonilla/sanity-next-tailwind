import type React from "react"
import type { ComponentWithBannerPosts } from "@/components/types"
import { Suspense, type CSSProperties } from "react"
import clsx from "clsx"
import { PortableText, type PortableTextComponents } from "next-sanity"
import SlidesHeroStatic from "./SlidesHeroStatic"
import SlidesPostStatic from "./SlidesPostStatic"
import dynamic from "next/dynamic"

// Import CarouselHydra with no SSR to prevent hydration mismatch
const CarouselHydra = dynamic(() => import("./CarouselHydra"), { ssr: false })

export type CarouselProps = {
  data: ComponentWithBannerPosts
  styleBg?: CSSProperties | undefined
}

export default function Carousel({ data, styleBg }: CarouselProps) {
  const isHero = data?.variant === "hero"
  const isPost = data?.variant === "post"

  return (
    <div
      className={clsx("relative w-full items-center justify-center", {
        "h-[500px] md:h-[650px]": isHero,
        "h-full": isPost,
      })}
    >
      <section
        className={clsx(`embla_${data?.variant}`, {
          "mx-auto h-fit max-w-screen-xl px-4": isPost,
        })}
      >
        {isPost && (
          <div className="relative flex h-full flex-col mb-6">
            <div className="relative flex size-full items-center justify-start">
              <PortableText
                value={data.content || []}
                components={
                  {
                    block: {
                      h2: ({ children }: { children: React.ReactNode }) => (
                        <h2
                          className={clsx(
                            "mb-4 text-left font-robotoslab text-2xl font-semibold text-neutral-700 drop-shadow-sm",
                            "lg:text-3xl 2xl:text-3xl",
                          )}
                        >
                          {children}
                        </h2>
                      ),
                    },
                  } as PortableTextComponents
                }
              />
            </div>
          </div>
        )}

        {/* Use a unique key for each variant's viewport */}
        <div key={`carousel-${data?.variant}`} className="embla__viewport">
          <div className="embla__container">
            {isHero && <SlidesHeroStatic data={data} styleBg={styleBg} />}
            {isPost && data?.bannerPostsItems && <SlidesPostStatic posts={data?.bannerPostsItems} />}
          </div>
        </div>

        {/* Render the appropriate carousel hydration component */}
        {data?.variant && (
          <Suspense fallback={null}>
            <CarouselHydra variant={data?.variant} />
          </Suspense>
        )}
      </section>
    </div>
  )
}

