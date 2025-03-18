'use client';
import type { ComponentProps, ComponentWithBannerPosts, ItemProps } from "@/components/types";
import type { EmblaOptionsType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import type { GetPostListByUnitBusinessQueryResult, GetPostListQueryResult } from "@/sanity.types";
import SlidePost from "./SlidePost";
import SlideHero from "./SlideHero";
import { useInView } from "framer-motion";

type EmblaCarouselClientProps = {
    data: ComponentWithBannerPosts | ComponentProps;
};

// Global cache to track which slides should be loaded
const slidesToLoadCache = new Set<number>();

export default function EmblaCarouselClient({ data }: EmblaCarouselClientProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [slidesToLoad, setSlidesToLoad] = useState<Set<number>>(new Set([0])); // Start with first slide
    const containerRef = useRef(null);

    // Use Framer Motion's useInView to detect when carousel is near viewport
    const isInView = useInView(containerRef, {
        margin: "200px", // Start loading when carousel is 200px away from viewport
        once: false // Keep checking if it goes in and out of view
    });

    const autoplayOptions = useMemo<AutoplayOptionsType>(() => ({
        delay: 7000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    }), []);

    const fadePlugin = useMemo(() => (data?.variant === "hero" ? Fade() : undefined), [data?.variant]);

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

    // Function to mark a slide for loading
    const markSlideForLoading = useCallback((index: number) => {
        setSlidesToLoad((prev) => {
            const newSet = new Set(prev);
            newSet.add(index);
            slidesToLoadCache.add(index);
            return newSet;
        });
    }, []);

    // Preload adjacent slides when a slide becomes active
    const preloadAdjacentSlides = useCallback((currentIndex: number) => {
        const totalSlides = data?.variant === "post" && "bannerPostsItems" in data
            ? data.bannerPostsItems?.length || 0
            : data?.items?.length || 0;

        if (totalSlides === 0) return;

        // Calculate next and previous indices with loop
        const nextIndex = (currentIndex + 1) % totalSlides;
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;

        // Preload current, next and previous slides
        markSlideForLoading(currentIndex);
        markSlideForLoading(nextIndex);
        markSlideForLoading(prevIndex);
    }, [data, markSlideForLoading]);

    useEffect(() => {
        if (!emblaApi || !isInView) return;

        const updateIndex = () => {
            const newIndex = emblaApi.selectedScrollSnap();
            setActiveIndex(newIndex);

            // Preload adjacent slides when a new slide becomes active
            preloadAdjacentSlides(newIndex);
        };

        updateIndex(); // Initialize activeIndex
        emblaApi.on("select", updateIndex); // Subscribe to slide changes

        return () => {
            emblaApi.off("select", updateIndex);
        }; // Cleanup
    }, [emblaApi, isInView, preloadAdjacentSlides]);

    // Initial load of first few slides when carousel comes into view
    useEffect(() => {
        if (isInView) {
            const initialSlidesToLoad = isMobile ? 3 : 5;
            const totalSlides = data?.variant === "post" && "bannerPostsItems" in data
                ? data.bannerPostsItems?.length || 0
                : data?.items?.length || 0;

            for (let i = 0; i < Math.min(initialSlidesToLoad, totalSlides); i++) {
                markSlideForLoading(i);
            }
        }
    }, [isInView, isMobile, data, markSlideForLoading]);

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
                markSlideForLoading(index);
            }
        },
        [isMobile, emblaApi, markSlideForLoading]
    );

    return (
        <div ref={containerRef} className="relative w-full">
            {/* IMPORTANTE: La estructura correcta para Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {data.variant === "post" &&
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
                                    className="flex-[0_0_100%] min-w-0"
                                    onClick={() => handleClick(index)}
                                >
                                    <SlidePost
                                        key={index}
                                        post={slide}
                                        isLoaded={slidesToLoad.has(index)}
                                        onLoad={() => markSlideForLoading(index)}
                                    />
                                </div>
                            )
                        )}

                    {data?.variant === "hero" &&
                        data?.items?.map((slide: ItemProps, index: number) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] min-w-0"
                                onClick={() => handleClick(index)}
                            >
                                <SlideHero
                                    key={`${index}-${activeIndex}`}
                                    slide={slide as ItemProps}
                                    index={index}
                                    activeIndex={activeIndex}
                                    isLoaded={slidesToLoad.has(index)}
                                    onLoad={() => markSlideForLoading(index)}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
