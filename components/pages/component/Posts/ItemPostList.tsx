import { GetPostListQueryResult } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

export default function ItemPostList({
  post,
}: {
  post: GetPostListQueryResult[number];
}) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <div className="relative h-48 md:h-full">
          <Image
            src={urlForImage(post.coverImage)?.url() || '/meeting.jpeg'}
            alt={post.title || ''}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                post.unitBusiness?.color || 'bg-gray-100 text-gray-800'
              }`}
            >
              {post.unitBusiness?.title}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <Link
              href={{ pathname: `/blog/${post.slug?.current}` }}
              className="hover:underline"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{post.resumen}</p>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(post.date || ''), 'MMMM d, yyyy')}
          </time>
        </div>
      </div>
    </article>
  );
}
