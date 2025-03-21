import type React from "react";
import type { ComponentWithBannerPosts } from "@/components/types";
import { type CSSProperties } from "react";
import CarouselHero from "./CarouselHero";
import CarouselPost from "./CarouselPost";

export type CarouselProps = {
  data: ComponentWithBannerPosts;
  styleBg?: CSSProperties | undefined;
};

export default function Carousel({ data, styleBg }: CarouselProps) {

  return (
    <>
      {
        data?.variant == "hero" ?
          <CarouselHero data={data} styleBg={styleBg} /> :
          <CarouselPost data={data} />
      }
    </>
  )
}