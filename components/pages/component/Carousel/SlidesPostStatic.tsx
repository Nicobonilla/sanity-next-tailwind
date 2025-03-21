import type { GetPostListQueryResult } from "@/sanity.types"
import { format } from "date-fns"
import Link from "next/link"
import type React from "react"
import ImageBgSsr from "../Background/ImageBgSsr"

export default function SlidesPostStatic({
  posts,
}: {
  posts: GetPostListQueryResult
}) {
  if (!posts) return null
  //const { imageBackground } = posts.components.find((component) => component.typeComponentValue === "Heading") || {}

  return (
    <>
      {posts?.map((slide: GetPostListQueryResult[number], index: number) => (
        <div key={index} className="embla__slide">
          <Link
            href={{ pathname: `/blog/${slide.slug?.current}` }}
            className="group relative"
          >
            <article className={`flex h-full min-h-[420px] flex-col rounded-xl bg-white`}>

              <div data-key={index}
                className="relative h-48 overflow-hidden"
              >
                {<ImageBgSsr
                  imgBg={slide?.components?.find(component =>
                    component.typeComponentValue == "Heading")?.imageBackground ?? null
                  }
                  index={index}
                  className={`h-48 object-cover transition-transform 
                  duration-300 ease-out group-hover:scale-110`}
                  sizes={"(max-width: 450px) 90vw, (max-width: 550px) 70vw, (max-width: 1028px) 33vw"}
                />}
              </div>

              <div className="flex flex-col gap-2 p-6">
                <div className="flex min-h-12 lg:min-h-14">
                  <h3 className="line-clamp-2 font-semibold text-gray-700 lg:text-lg">
                    {slide.title}
                  </h3>
                </div>
                <div className="flex min-h-20">
                  <p className="line-clamp-3 text-justify font-montserrat text-sm font-light text-gray-900">
                    {slide?.resumen}
                  </p>
                </div>
                <time
                  className="text-sm text-gray-500 dark:text-gray-400"
                  style={{ whiteSpace: "nowrap" }} // Evita el ajuste de línea
                >
                  {format(new Date(slide.date || ""), "MMMM d, yyyy")}
                </time>
              </div>

            </article>
          </Link>
        </div>
      ))}
    </>
  )
}

