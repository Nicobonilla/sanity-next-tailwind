"use client"
import type { ComponentProps, ComponentWithBannerPosts, ItemProps } from "@/components/types"
import type { EmblaOptionsType } from "embla-carousel"
import type { AutoplayOptionsType } from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import Fade from "embla-carousel-fade"
import Autoplay from "embla-carousel-autoplay"
import type { GetPostListByUnitBusinessQueryResult, GetPostListQueryResult } from "@/sanity.types"
import SlidePost from "./SlidePost"
import SlideHero from "./SlideHero"

type EmblaCarouselClientProps = {
    data: ComponentWithBannerPosts | ComponentProps
}

// Global cache to track loaded images across renders
const loadedImagesCache = new Set<number>()

// Number of slides to preload ahead and behind the current slide
const PRELOAD_COUNT = 2

export default function EmblaCarouselClient({ data }: EmblaCarouselClientProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set(loadedImagesCache))
    const [initialLoadComplete, setInitialLoadComplete] = useState(false)
    const totalSlides = useRef(data?.items?.length || ('bannerPostsItems' in data ? data.bannerPostsItems?.length : 0) || 0)

    const autoplayOptions = useMemo<AutoplayOptionsType>(
        () => ({
            delay: 7000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
        [],
    )

    const fadePlugin = useMemo(() => (data?.variant === "hero" ? Fade() : undefined), [data?.variant])

    const plugins = useMemo(
        () =>
            [Autoplay(autoplayOptions), fadePlugin].filter((plugin): plugin is NonNullable<typeof plugin> => Boolean(plugin)),
        [autoplayOptions, fadePlugin],
    )

    const options: EmblaOptionsType = {
        align: "start",
        loop: true,
        dragFree: false,
    }

    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

    // Function to mark an image as loaded
    const markImageLoaded = useCallback((index: number) => {
        setLoadedImages((prev) => {
            const newSet = new Set(prev)
            newSet.add(index)
            loadedImagesCache.add(index) // Update the global cache
            return newSet
        })
    }, [])

    // Function to preload images around the current index
    const preloadAdjacentSlides = useCallback(
        (currentIndex: number) => {
            if (totalSlides.current === 0) return

            // Calculate indices to preload (current + PRELOAD_COUNT ahead and behind)
            const indicesToPreload = []

            // Add current index
            indicesToPreload.push(currentIndex)

            // Add next slides
            for (let i = 1; i <= PRELOAD_COUNT; i++) {
                const nextIndex = (currentIndex + i) % totalSlides.current
                indicesToPreload.push(nextIndex)
            }

            // Add previous slides
            for (let i = 1; i <= PRELOAD_COUNT; i++) {
                const prevIndex = (currentIndex - i + totalSlides.current) % totalSlides.current
                indicesToPreload.push(prevIndex)
            }

            // Mark these indices for loading if they're not already loaded
            indicesToPreload.forEach((index) => {
                if (!loadedImages.has(index)) {
                    // Use setTimeout to stagger the loading and not block the main thread
                    setTimeout(() => markImageLoaded(index), 100 * (index - currentIndex))
                }
            })
        },
        [loadedImages, markImageLoaded],
    )

    useEffect(() => {
        if (!emblaApi) return

        const updateIndex = () => {
            const newIndex = emblaApi.selectedScrollSnap()
            setActiveIndex(newIndex)

            // Preload adjacent slides when a new slide becomes active
            preloadAdjacentSlides(newIndex)
        }

        updateIndex() // Initialize activeIndex
        emblaApi.on("select", updateIndex) // Subscribe to slide changes

        // Mark initial load as complete after first render and preload initial slides
        if (!initialLoadComplete) {
            setInitialLoadComplete(true)
            preloadAdjacentSlides(0) // Preload slides around the first slide
        }

        return () => {
            emblaApi.off("select", updateIndex)
        } // Cleanup
    }, [emblaApi, initialLoadComplete, preloadAdjacentSlides])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const handleClick = useCallback(
        (index: number) => {
            if (isMobile && emblaApi) {
                emblaApi.scrollTo(index)
            }
        },
        [isMobile, emblaApi],
    )

    // Update totalSlides ref when data changes
    useEffect(() => {
        if ('bannerPostsItems' in data) {

            totalSlides.current = data.bannerPostsItems?.length || 0;
        } else {
            totalSlides.current = data?.items?.length || 0;
        }
    }, [data])
    return (
        <div ref={emblaRef} className="embla__viewport">
            <div className="embla__container">



                {data.variant === "post" &&
                    'bannerPostsItems' in data &&
                    data.bannerPostsItems?.map(
                        (slide: GetPostListQueryResult[number] | GetPostListByUnitBusinessQueryResult[number], index: number) => (
                            <div key={index} className="embla__slide" onClick={() => handleClick(index)}>
                                <SlidePost
                                    key={index}
                                    post={slide}
                                    isLoaded={loadedImages.has(index)}
                                    onLoad={() => markImageLoaded(index)}
                                />
                            </div>
                        ),
                    )}


                {data?.variant === "hero" &&
                    data?.items?.map((slide: ItemProps, index: number) => (
                        <div key={index} className="embla__slide" onClick={() => handleClick(index)}>
                            <SlideHero
                                key={`${index}-${activeIndex}`}
                                slide={slide as ItemProps}
                                index={index}
                                activeIndex={activeIndex}
                                isLoaded={loadedImages.has(index)}
                                onLoad={() => markImageLoaded(index)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )

}
