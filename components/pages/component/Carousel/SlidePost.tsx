import { GetPostListQueryResult } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
      >
        <article className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
          <div className="grid">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={urlForImage(imageBackground)?.url() || '/meeting.jpeg'}
                alt={post.title || ''}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-2 p-6">
              {path === '/blog' ? (
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      post.unitBusiness?.color || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.unitBusiness?.title}
                  </span>
                </div>
              ) : null}

              <div className="flex min-h-12 items-center lg:min-h-14">
                <h3 className="font-semibold text-gray-700 group-hover:underline lg:text-lg">
                  {post.title}
                </h3>
              </div>

              <div className="flex min-h-20 items-center">
                <p className="text-justify font-fira text-sm font-light text-gray-900">
                  {post?.resumen && post?.resumen?.length > 195
                    ? post.resumen.slice(0, 150) + '...'
                    : post.resumen}
                </p>
              </div>

              <div className={clsx({ 'flex flex-row gap-2': path == '/' })}>
                {path == '/' && (
                  <span
                    className={`inline-block text-sm font-medium ${
                      false ? post.unitBusiness?.color : 'text-gray-800'
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
