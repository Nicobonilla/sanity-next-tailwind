import type React from "react";
import type { ComponentWithBannerPosts } from "@/components/types";
import { Suspense, type CSSProperties } from "react";
import clsx from "clsx";
import { PortableText, type PortableTextComponents } from "next-sanity";
import SlidesHeroStatic from "./SlidesHeroStatic";
import SlidesPostStatic from "./SlidesPostStatic";
import CarouselHydra from "./CarouselHydra";

export type CarouselProps = {
  data: ComponentWithBannerPosts;
  styleBg?: CSSProperties | undefined;
};

export default function Carousel({ data, styleBg }: CarouselProps) {

  return (
    <div
      className={clsx("relative w-full items-center justify-center", {
        "h-[500px] md:h-[650px] ": data?.variant === "hero",
        "h-full": data?.variant === "post",
      })}
    >
      <section
        className={clsx(`embla_${data?.variant}`, {
          "mx-auto h-fit max-w-screen-xl px-4":
            data?.variant === "post"
        })}
      >
        {data?.variant === "post" && (
          <>
            <div className="relative flex h-full flex-col">
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
            </div>
            <div className="embla__viewport">
              <div className="embla__container">
                {data?.bannerPostsItems &&
                  <SlidesPostStatic posts={data?.bannerPostsItems} />}
              </div>
            </div>
          </>
        )}
        {data?.variant === "hero" && (
          <>
            <div className="embla__viewport">
              <div className="embla__container">
                <SlidesHeroStatic data={data} styleBg={styleBg} />

              </div>
            </div>
          </>
        )}
        {data?.variant && <Suspense fallback={null}>
          <CarouselHydra variant={data?.variant} />
        </Suspense>
        }
      </section>
    </div >
  );
}