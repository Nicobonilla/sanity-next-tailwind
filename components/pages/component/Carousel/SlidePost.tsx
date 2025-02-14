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
      (component) => component.typeComponentValue === 'heading'
    ) || {};

  return (
    <div className="group relative h-fit w-full items-center overflow-hidden px-1">
      <Link
        href={{ pathname: `/blog/${post.slug?.current}` }}
        className="group"
      >
        <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
          <div className="grid">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={urlForImage(imageBackground)?.url() || '/meeting.jpeg'}
                alt={post.title || ''}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-4 p-6">
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
              <h3 className="font-semibold text-gray-700 group-hover:underline lg:text-lg xl:text-xl">
                {post.title}
              </h3>
              <p className="font-fira text-sm font-light text-gray-900 xl:text-base">
                {post.resumen}
              </p>
              <div className={clsx({ 'flex flex-row gap-2': path == '/' })}>
                {path == '/' && (
                  <span
                    className={`inline-block text-sm font-medium ${
                      false ? post.unitBusiness?.color : 'text-gray-800'
                    }`}
                  >
                    {post.unitBusiness?.title}
                  </span>
                )}
                <time className="text-sm text-gray-500 dark:text-gray-400">
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
