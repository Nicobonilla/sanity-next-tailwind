import type React from "react";
import type { ComponentWithBannerPosts } from "@/components/types";
import { Suspense } from "react";
import clsx from "clsx";
import { PortableText, type PortableTextComponents } from "next-sanity";
import SlidesPostStatic from "./SlidesPostStatic";
import CarouselHydra from "./CarouselHydra";

export type CarouselProps = {
  data: ComponentWithBannerPosts;
};

export default function CarouselPost({ data }: CarouselProps) {
  return (
    <div className="relative size-full items-center justify-center mx-auto max-w-screen-xl my-10 lg:my-20 flex-col">

      <div className="relative flex h-full flex-col">
        <div className="relative flex size-full items-center justify-center sm:justify-start lg:ml-5 mx-auto mb-5">
          <PortableText
            value={data.content || []}
            components={
              {
                block: {
                  h2: ({ children }: { children: React.ReactNode }) => (
                    <h2
                      className={clsx(
                        "font-robotoslab text-2xl font-semibold text-neutral-700",
                        "lg:text-3xl 2xl:text-3xl"
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
        <div className="embla_post h-fit px-4">
          <div className="embla__viewport">
            <div className="embla__container">
              {data?.bannerPostsItems && <>
                <SlidesPostStatic posts={data?.bannerPostsItems} />
                <Suspense fallback={null}>
                  <CarouselHydra variant={"post"} />
                </Suspense>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}