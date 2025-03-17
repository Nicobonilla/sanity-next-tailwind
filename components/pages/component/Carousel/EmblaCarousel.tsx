
import { useMemo, memo } from "react";
import clsx from "clsx";
import { PortableText, type PortableTextComponents } from "next-sanity";

import type { CarouselProps } from ".";
import EmblaCarouselClient from "./EmblaCarouselClient";

type EmblaCarouselProps = {
  data: CarouselProps["data"];
};

const EmblaCarousel = memo(function EmblaCarousel({
  data,
}: EmblaCarouselProps) {

  const portableTextComponents = useMemo(
    () =>
    ({
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
    } as PortableTextComponents),
    []
  );

  const sectionClassName = useMemo(
    () =>
      clsx({
        embla_hero: data?.variant == "hero",
        "embla_post mx-auto h-fit max-w-screen-xl items-center justify-center px-4":
          data?.variant == "post",
        embla: data?.variant !== "post" && data?.variant !== "hero",
      }),
    [data?.variant]
  );

  return (
    <section className={sectionClassName}>
      {data?.variant == "post" && (
        <div className="relative flex h-full flex-col">
          <div className="relative flex size-full items-center justify-start">
            <PortableText value={data.content || []} components={portableTextComponents} />
          </div>
        </div>
      )}
      <EmblaCarouselClient data={data} />
    </section>
  );
});

EmblaCarousel.displayName = "EmblaCarousel";

export default EmblaCarousel;
