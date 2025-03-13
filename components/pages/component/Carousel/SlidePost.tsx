//import { trackButtonClick } from '@/components/lib/GTMTrackers';
import type { GetPostListQueryResult } from '@/sanity.types';
import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ImageBg from '../Background/ImageBg';

export default function SlidePost({
  post,
}: {
  post: GetPostListQueryResult[number];
}) {
  const path = usePathname();
  if (!post.components) return null;

  const { imageBackground } =
    post.components.find(
      (component) => component.typeComponentValue === 'Heading'
    ) || {};
  return (
    <div className="group relative h-fit w-full items-center overflow-hidden px-1">
      <Link
        href={{ pathname: `/blog/${post.slug?.current}` }}
        className="group"
      //onClick={() => trackButtonClick(post.slug?.current || '','CarouselPost' + '-' + path)}
      >
        <article className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
          <div className="grid">
            <div className="relative h-48 overflow-hidden">
              <ImageBg imgBg={imageBackground} index={1} className={"h-48 overflow-hidden object-cover transition-transform duration-300 ease-out group-hover:scale-110"}
                sizes={"(max-width: 450px) 90vw, (max-width: 550px) 70vw, (max-width: 1028px) 33vw"} />
            </div>
            <div className="flex flex-col gap-2 p-6">
              {path === '/blog' ? (
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${post.unitBusiness?.color || 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {post.unitBusiness?.title}
                  </span>
                </div>
              ) : null}

              <div className="flex min-h-12 items-center lg:min-h-14">
                <h3 className="line-clamp-2 font-semibold text-gray-700 group-hover:underline lg:text-lg">
                  {post.title}
                </h3>
              </div>

              <div className="flex min-h-20 items-center">
                <p className="line-clamp-3 text-justify font-montserrat text-sm font-light text-gray-900">
                  {post?.resumen}
                </p>
              </div>

              <div className={clsx({ 'flex flex-row gap-2': path == '/' })}>
                {path == '/' && (
                  <span
                    className={`inline-block text-sm font-medium ${false ? post.unitBusiness?.color : 'text-gray-800'
                      }`}
                    style={{ whiteSpace: 'nowrap' }} // Evita el ajuste de línea
                  >
                    {post.unitBusiness?.title}
                  </span>
                )}
                <time
                  className="text-sm text-gray-500 dark:text-gray-400"
                  style={{ whiteSpace: 'nowrap' }} // Evita el ajuste de línea
                >
                  {format(new Date(post.date || ''), 'MMMM d, yyyy')}
                </time>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
