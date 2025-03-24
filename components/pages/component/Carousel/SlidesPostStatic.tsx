import type { GetPostListQueryResult } from "@/sanity.types"
import { format } from "date-fns"
import Link from "next/link"
import ImageLoader from "../ImageLoader"

export default function SlidesPostStatic({
  posts,
}: {
  posts: GetPostListQueryResult
}) {
  if (!posts) return null

  return (
    <>
      {posts?.map((slide: GetPostListQueryResult[number], index: number) => (
        <div key={index} className="embla__slide">
          <div className="group relative h-fit w-full items-center overflow-hidden">
            <Link href={{ pathname: `/blog/${slide.slug?.current}` }} className="group block h-full">
              <article className="flex h-full min-h-[420px] flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div data-key={index} className="relative h-48 overflow-hidden rounded-t-xl">
                  {
                    <ImageLoader
                      imgBg={
                        slide?.components?.find((component) => component.typeComponentValue == "Heading")
                          ?.imageBackground ?? null
                      }
                      className="h-48 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                      sizes="(max-width: 450px) 90vw, (max-width: 550px) 70vw, (max-width: 1028px) 33vw"
                    />
                  }
                </div>

                <div className="flex flex-1 flex-col gap-2 p-6">
                  <div className="flex min-h-12 lg:min-h-14">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-700">{slide.title}</h3>
                  </div>
                  <div className="flex min-h-20">
                    <p className="line-clamp-4 text-justify font-montserrat text-sm font-light text-gray-900 overflow-hidden text-ellipsis">
                      {slide?.resumen}
                    </p>
                  </div>
                  <time className="mt-auto text-sm text-gray-500 font-semibold" style={{ whiteSpace: "nowrap" }}>
                    {format(new Date(slide.date || ""), "MMMM d, yyyy")}
                  </time>
                </div>
              </article>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

