import type React from "react";
import type { ComponentWithBannerPosts } from "@/components/types";
import { Suspense, type CSSProperties } from "react";
import SlidesHeroStatic from "./SlidesHeroStatic";
import CarouselHydra from "./CarouselHydra";

export type CarouselProps = {
  data: ComponentWithBannerPosts;
  styleBg?: CSSProperties | undefined;
};

export default function CarouselHero({ data, styleBg }: CarouselProps) {

  return (
    <div className={"relative w-full items-center justify-center h-[500px] md:h-[650px]"}>
      <div className="embla_hero">
        <div className="embla__viewport">
          <div className="embla__container">
            <SlidesHeroStatic data={data} styleBg={styleBg} />
            <Suspense fallback={null}>
              <CarouselHydra variant={"hero"} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}