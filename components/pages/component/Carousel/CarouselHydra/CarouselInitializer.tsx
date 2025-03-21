"use client";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

type CarouselInitializerProps = {
    variant?: string;
    setActiveIndex: (index: number) => void;
    emblaRef: HTMLDivElement; // Mantenemos esto como HTMLDivElement porque pasamos containerRef.current
};

export default function CarouselInitializer({ setActiveIndex, variant, emblaRef }: CarouselInitializerProps) {
    const options: EmblaOptionsType = { align: "start", loop: true };

    const plugins: (ReturnType<typeof Autoplay> | ReturnType<typeof Fade>)[] = [
        Autoplay({ delay: 8000, stopOnInteraction: false }),
    ];
    if (variant === "hero") plugins.push(Fade());

    const [emblaRefCallback, emblaApi] = useEmblaCarousel(options, plugins);

    useEffect(() => {
        if (emblaRef) {
            emblaRefCallback(emblaRef);
            console.log("inizializdo", variant);
        }
    }, [emblaRef, emblaRefCallback]);

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
    }, [emblaApi, setActiveIndex]);

    return null;
}