import type React from "react"
import type { ComponentProps } from "@/components/types"
import { urlForImage } from "@/sanity/lib/utils"
import Image from "next/image"
import DesktopImageEnhancer from "./DesktopImageEnhancer"
import clsx from "clsx"

export default function ImageLoader({
    imgBg,
    priority = false,
    className,
    sizes = "100vw",
    desktopHencement = false,
}: {
    imgBg?: ComponentProps["imageBackground"] | null
    priority?: boolean
    className?: string
    sizes?: string
    desktopHencement?: boolean
}): React.ReactNode {

    if (!imgBg?.asset?._ref) return null
    const initialWidth = 640
    try {
        const imageUrl = urlForImage(imgBg)?.width(initialWidth).quality(50).auto("format").fit("max").url()

        return (
            <div className="relative size-full">
                <Image
                    src={imageUrl || ''}
                    alt={"Background image"} // Usa alt desde Sanity si está disponible
                    sizes={sizes}
                    fill
                    className={clsx("object-cover", className, "img-" + initialWidth)}
                    priority={priority}
                />

                {desktopHencement && <DesktopImageEnhancer
                    imgBg={imgBg}
                    className={className || ""}
                    sizes={sizes}
                    priority={priority} />}
            </div>
        )
    } catch (error) {
        console.error("Error al cargar la imagen:", error)
        return null
    }
}
