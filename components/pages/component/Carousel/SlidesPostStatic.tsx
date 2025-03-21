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
        <div className="embla__slide group relative h-fit w-full items-center overflow-hidden px-1">
          <Link
            href={{ pathname: `/blog/${slide.slug?.current}` }}
            className="group"
          >
            <article className={`flex h-full min-h-[420px] flex-col overflow-hidden 
        rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg`}>
              <div className="grid">

                <div data-key={index}
                  className="relative h-48 overflow-hidden"
                >
                  {<ImageBgSsr
                    imgBg={slide?.components?.find(component =>
                      component.typeComponentValue == "Heading")?.imageBackground ?? null
                    }
                    index={index}
                    className={`h-48 overflow-hidden object-cover transition-transform 
                  duration-300 ease-out group-hover:scale-110`}
                    sizes={"(max-width: 450px) 90vw, (max-width: 550px) 70vw, (max-width: 1028px) 33vw"}
                  />}
                </div>

                <div className="flex flex-col gap-2 p-6">
                  <div className="flex min-h-12 items-center lg:min-h-14">
                    <h3 className="line-clamp-2 font-semibold text-gray-700 group-hover:underline lg:text-lg">
                      {slide.title}
                    </h3>
                  </div>
                  <div className="flex min-h-20 items-center">
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

              </div>
            </article>
          </Link>
        </div>
      ))}
    </>
  )
}

