import { PortableText } from 'next-sanity';
import { ComponentWithBannerPosts } from '@/components/types';
import clsx from 'clsx';
import ItemPostList from '../Posts/ItemPostList';
import {
  PTextBannerDark1,
  PTextBannerDark2,
  PTextBannerDark3,
} from '../PTextComponents';

export default function InnerBannerWithItems({
  data,
}: {
  data: ComponentWithBannerPosts;
}) {
  return (
    <div
      className={clsx(
        'relative z-20 mx-auto h-fit px-3 pt-16 lg:max-w-screen-xl lg:pb-16'
      )}
    >
      {/* Title and Premise Section */}

      {data.content && (
        <div className="mb-10 grid grid-cols-1 text-center md:grid-cols-2 md:gap-6 lg:px-10">
          {/* Columna 1: h2 y h3 */}
          <div className="flex flex-col md:text-left">
            <PortableText
              value={data.content || []}
              components={PTextBannerDark2}
            />
          </div>

          {/* Columna 2: p (texto normal) */}
          <div className="my-auto items-center">
            <PortableText
              value={data.content || []}
              components={PTextBannerDark3}
            />
          </div>
        </div>
      )}

      <div className={clsx('relative flex flex-col gap-6')}>
        <div className="grid gap-6">
          {data.bannerPostsItems.length > 0 ? (
            data.bannerPostsItems.map(
              (
                post: ComponentWithBannerPosts['bannerPostsItems'],
                index: number
              ) => (
                <div key={index}>
                  <ItemPostList post={post} />
                </div>
              )
            )
          ) : (
            <div className="py-12 text-center text-gray-600 dark:text-gray-400">
              No se encontraron posts para esta categoría.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
