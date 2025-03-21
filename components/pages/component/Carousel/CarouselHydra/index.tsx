"use client";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import AnimatedPortals from "./AnimatedPortals";

export default function CarouselHydra({ variant }: { variant: string }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    console.log("hidratacion", variant, "isMounted", isMounted);

    // Embla Carousel setup
    const options: EmblaOptionsType = {
        align: "start",
        loop: true,
        dragFree: false,
        containScroll: "trimSnaps",
        duration: 100,
    };

    const plugins: (ReturnType<typeof Autoplay> | ReturnType<typeof Fade>)[] = [
        Autoplay({ delay: 8000, stopOnInteraction: false }),
    ];
    if (variant === "hero") plugins.push(Fade());

    const [emblaRefCallback, emblaApi] = useEmblaCarousel(options, plugins);

    // Mount detection
    useEffect(() => {
        if (isMounted) return;
        const viewport = document.querySelector(`.embla_${variant} .embla__viewport`);
        if (viewport) {
            containerRef.current = viewport as HTMLDivElement;
            setIsMounted(true);
        }
        return () => setIsMounted(false);
    }, [variant, isMounted]);

    // Embla ref initialization
    useEffect(() => {
        if (containerRef.current) {
            emblaRefCallback(containerRef.current);
            console.log("inizializdo", variant);
        }
    }, [containerRef, emblaRefCallback, variant]);

    // Active index tracking
    useEffect(() => {
        if (!emblaApi) return;

        const updateIndex = () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
        };

        updateIndex();
        emblaApi.on("select", updateIndex);

        return () => {
            emblaApi.off("select", updateIndex);
        };
    }, [emblaApi]);

    if (!isMounted || !containerRef.current) return null;

    return (
        <>
            {variant === "hero" && (
                <AnimatedPortals
                    imageContainers={[containerRef.current]}
                    activeIndex={activeIndex}
                />
            )}
        </>
    );
}