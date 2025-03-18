'use client';

import { useEffect, useState, memo } from "react";
import PTextHero from "../Background/PTextHero";
import type { ItemProps } from "@/components/types";
import dynamic from "next/dynamic";

// Lazy load de la versión animada como componente cliente
const AnimatedImageBg = dynamic(() => import("@/components/pages/component/Carousel/AnimatedImageBg"), {
  ssr: false,
});

type SlideHeroProps = {
  slide: ItemProps;
  index: number;
  activeIndex: number;
  isLoaded?: boolean;
  onLoad?: () => void;
};

// Memoizar SlideHero para evitar renders innecesarios
const SlideHero = memo(function SlideHero({
  slide,
  index,
  activeIndex,
  isLoaded = false,
  onLoad
}: SlideHeroProps) {
  const [localLoaded, setLocalLoaded] = useState(isLoaded);
  const isActive = index === activeIndex;

  // Actualizar el estado local cuando cambia la prop
  useEffect(() => {
    if (isLoaded && !localLoaded) {
      setLocalLoaded(true);
    }
  }, [isLoaded, localLoaded]);

  // Notificar que este slide debe cargarse cuando se activa
  useEffect(() => {
    if (isActive && !localLoaded && onLoad) {
      onLoad();
      setLocalLoaded(true);
    }
  }, [isActive, localLoaded, onLoad]);

  return (
    <div className="relative h-[500px] md:h-[650px] w-full overflow-hidden">
      {/* Contenedor para la imagen de fondo con posición absoluta */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatedImageBg
          imgBg={slide?.image}
          index={index}
          isActive={isActive}
          onLoad={() => {
            setLocalLoaded(true);
            if (onLoad) onLoad();
          }}
          showSkeleton={!localLoaded}
        />
      </div>

      {/* Contenedor para el texto con posición relativa y z-index para estar por encima de la imagen */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <PTextHero content={slide?.content} link={slide?.ctaLinkItem} />
      </div>
    </div>
  );
});

SlideHero.displayName = "SlideHero";

export default SlideHero;