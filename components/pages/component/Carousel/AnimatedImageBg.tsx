"use client"

import { motion } from "framer-motion"
import ImageBg from "../Background/ImageBg"

export default function AnimatedImageBg({
  imgBg,
  imgBgType,
  index,
  isActive,
  onLoad,
}: {
  imgBg: any
  imgBgType: string
  index: number
  isActive: boolean
  onLoad?: () => void
}) {
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
  }

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      variants={variants}
      onAnimationStart={onLoad}
    >
      <ImageBg imgBg={imgBg} imgBgType={imgBgType}  />
    </motion.div>
  )
}

