"use client";
import { useEffect, useState } from "react";

type ImageHandlerProps = {
    containerRef: React.RefObject<HTMLDivElement>;
};

export default function ImageHandler({ containerRef }: ImageHandlerProps) {
    const [imageContainers, setImageContainers] = useState<HTMLDivElement[]>([]);

    useEffect(() => {
        if (containerRef.current) {
            const foundImageContainers = containerRef.current.querySelectorAll(".image-bg-ssr");
            const containersArray = Array.from(foundImageContainers) as HTMLDivElement[];
            setImageContainers(containersArray);
            console.log("Found image containers:", containersArray.length);
        }
    }, [containerRef]);

    // Podrías devolver algo si necesitas renderizar, pero por ahora retornamos null
    return null;
}