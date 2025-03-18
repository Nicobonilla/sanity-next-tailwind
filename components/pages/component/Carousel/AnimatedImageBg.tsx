'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import ImageBg from "../Background/ImageBg";
import type { ItemProps } from "@/components/types";

export default function AnimatedImageBg({
  imgBg,
  index,
  isActive,
  onLoad = () => { },
  showSkeleton = false,
}: {
  imgBg: ItemProps["image"];
  index: number;
  isActive: boolean;
  onLoad?: () => void;
  showSkeleton?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Llamar a onLoad cuando el componente está en vista o es activo
  useEffect(() => {
    if ((isInView || isActive) && onLoad) {
      onLoad();
    }
  }, [isInView, isActive, onLoad]);

  // Simple animation variants
  const variants = {
    active: {
      scale: 1.05,
      opacity: 1,
      transition: { duration: 8, ease: "easeOut" },
    },
    inactive: {
      scale: 1,
      opacity: 0.9,
      transition: { duration: 1.5, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      variants={variants}
    >
      <ImageBg
        imgBg={imgBg}
        index={index}
        className="w-full h-full object-cover"
        sizes="100vw"
        showSkeleton={showSkeleton}
        onLoad={onLoad}
      />
    </motion.div>
  );
}
