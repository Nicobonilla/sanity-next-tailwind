
'use client';
import type { ComponentProps, ComponentWithBannerPosts, ItemProps } from "@/components/types";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import type { GetPostListByUnitBusinessQueryResult, GetPostListQueryResult } from "@/sanity.types";
import SlidePost from "./SlidePost";
import SlideHero from "./SlideHero";

type EmblaCarouselClientProps = {
    data: ComponentWithBannerPosts | ComponentProps;
};

export default function EmblaCarouselClient({ data }: EmblaCarouselClientProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const autoplayOptions: AutoplayOptionsType = {
        delay: 7000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    };

    const fadePlugin = useMemo(
        () => (data?.variant === "hero" ? Fade() : undefined),
        [data?.variant]
    );

    const plugins = useMemo(
        () =>
            [
                Autoplay(autoplayOptions),
                fadePlugin,
            ].filter((plugin): plugin is NonNullable<typeof plugin> => Boolean(plugin)),
        [autoplayOptions, fadePlugin]
    );

    const options: EmblaOptionsType = {
        align: 'start',
        loop: true,
        dragFree: false,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setActiveIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleClick = useCallback(
        (index: number) => {
            if (isMobile && emblaApi) {
                emblaApi.scrollTo(index);
            }
        },
        [isMobile, emblaApi]
    );

    return (
        <div ref={emblaRef} className="embla__viewport">
            <div className="embla__container">
                {data.variant == "post" &&
                    "bannerPostsItems" in data &&
                    data?.bannerPostsItems?.map(
                        (
                            slide:
                                | GetPostListQueryResult[number]
                                | GetPostListByUnitBusinessQueryResult[number],
                            index: number
                        ) => (
                            <div
                                key={index}
                                className="embla__slide"
                                onClick={() => handleClick(index)}
                            >
                                <SlidePost key={index} post={slide} />
                            </div>
                        )
                    )}

                {data?.variant == "hero" &&
                    data?.items?.map((slide: ItemProps, index: number) => (
                        <div
                            key={index}
                            className="embla__slide"
                            onClick={() => handleClick(index)}
                        >
                            <SlideHero
                                key={`${index}-${activeIndex}`}
                                slide={slide as ItemProps}
                                index={index}
                                activeIndex={activeIndex}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}
