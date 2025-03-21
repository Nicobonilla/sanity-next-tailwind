import type { ComponentProps, ComponentWithBannerPosts, ItemProps } from "@/components/types";
import ImageBgSsr from "../Background/ImageBgSsr";
import PTextHero from "../Background/PTextHero";
import Layer from "../Background/Layer";
import type { CSSProperties } from "react";

type HeroStaticProps = {
    data: ComponentWithBannerPosts | ComponentProps;
    styleBg: CSSProperties | undefined;
};

export default function SlidesHeroStatic({ data, styleBg }: HeroStaticProps) {
    return (
        <>
            {data?.items?.map((slide: ItemProps, index: number) => (
                <div key={index}
                    className="embla__slide">
                    <div className="relative h-[500px] md:h-[650px]">
                        {/* Fondo: z-0 */}
                        <div
                            data-key={index}
                            className="absolute z-0 inset-0 w-full h-full image-bg-ssr"
                        >
                            <ImageBgSsr
                                imgBg={slide.image}
                                index={index}
                                className="w-full h-full object-cover"
                                sizes="100vw"
                            />
                        </div>

                        {/* Capa intermedia: z-10 */}
                        {data?.backgroundValue?.layer && (
                            <div className="absolute z-10 inset-0 w-full h-full">
                                <Layer
                                    layer={data?.backgroundValue?.layer}
                                    currentStyle={styleBg}
                                />
                            </div>
                        )}

                        {/* Texto y botón: z-20 */}
                        <div className="absolute z-20 inset-0 h-full w-full flex items-center justify-center">
                            <PTextHero content={slide?.content} link={slide?.ctaLinkItem} />
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    );
}