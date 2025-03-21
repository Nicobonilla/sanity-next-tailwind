"use client";
import { useState, useEffect, useRef } from "react";
import AnimatedPortals from "./AnimatedPortals";
import CarouselInitializer from "./CarouselInitializer";

export default function CarouselHydra({ variant }: { variant: string }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsMounted(true);
        const carousel = document.querySelector(`.embla_${variant} .embla__viewport`);
        if (carousel) {
            containerRef.current = carousel as HTMLDivElement;
        }
        return () => setIsMounted(false);
    }, [variant]);

    if (!isMounted || !containerRef.current) return null;

    return (
        <>
            <CarouselInitializer
                setActiveIndex={setActiveIndex}
                variant={variant}
                emblaRef={containerRef.current}
            />
            {/*variant === "hero" && containerRef && <ImageHandler containerRef={containerRef} />*/}
            {variant === "hero" && (
                <AnimatedPortals
                    imageContainers={[containerRef.current]}
                    activeIndex={activeIndex}
                />
            )}
        </>
    );
}