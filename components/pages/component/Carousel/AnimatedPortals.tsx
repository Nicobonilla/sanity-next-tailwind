"use client";
import { useEffect, useRef } from "react";

type AnimatedPortalsProps = {
  imageContainers: HTMLDivElement[];
  activeIndex: number;
};

export default function AnimatedPortals({ imageContainers, activeIndex }: AnimatedPortalsProps) {
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Actualizamos las referencias cuando imageContainers cambia
  useEffect(() => {
    imageContainerRefs.current = imageContainers;
  }, [imageContainers]);

  useEffect(() => {
    if (!imageContainerRefs.current.length) return;

    imageContainerRefs.current.forEach((container) => {
      if (!container) return;

      const dataKey = Number.parseInt(container.getAttribute("data-key") || "0", 10);
      const isActive = activeIndex === dataKey;

      const img = container.querySelector("img");
      if (img) {
        img.animate(
          { transform: `scale(${isActive ? 1.15 : 1})`, opacity: isActive ? 1 : 0.9 },
          {
            duration: isActive ? 15000 : 800,
            easing: isActive ? "ease-out" : "ease-in",
            fill: "forwards",
          }
        );
      }
    });
  }, [activeIndex]);

  return null;
}