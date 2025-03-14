import { type GetPostListQueryResult } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ItemPostList({
  post,
}: {
  post: GetPostListQueryResult[number];
}) {
  //console.log('post: ', post);
  const path = usePathname();
  if (!post.components) return null;
  console.log('path: ', path);
  const { imageBackground } =
    post.components.find(
      (component) => component.typeComponentValue === 'Heading'
    ) || {};
  return (
    <Link href={{ pathname: `/blog/${post.slug?.current}` }} className="group">
      <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <div className="h-48 overflow-hidden md:h-full">
            <div className="relative flex size-full">
              <Image
                src={urlForImage(imageBackground)?.url() || '/meeting.jpeg'}
                alt={post.title || ''}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1028px) 50vw, 300px"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            {path == '/blog' ||
              (path == '/' && (
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${post.unitBusiness?.color || 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {post.unitBusiness?.title}
                  </span>
                </div>
              ))}
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-700 group-hover:underline">
              {post.title}
            </h3>
            <p className="line-clamp-3 font-robotoslab text-sm font-light text-gray-900">
              {post.resumen}
            </p>
            <div>
              <span
                className={`mr-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${post.unitBusiness?.color || 'bg-gray-100 text-gray-800'
                  }`}
              >
                {post.unitBusiness?.title}
              </span>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(post.date || ''), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
