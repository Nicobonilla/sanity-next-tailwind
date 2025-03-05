import { PortableText } from 'next-sanity';
import { ComponentWithBannerPosts } from '@/components/types';
import clsx from 'clsx';
import {
  PTextBannerDark1,
  PTextBannerDark2,
  PTextBannerDark3,
} from '../PTextComponents';
import ItemPostList from '../Posts/ItemPostList';

export default function InnerBannerWithItems({
  data,
}: {
  data: ComponentWithBannerPosts;
}) {
  return (
    <div
      className={clsx(
        'relative z-20 mx-auto h-fit px-3 py-32',
        'lg:max-w-screen-xl'
      )}
    >
      {/* Title and Premise Section */}

      {data.content && (
        <div
          className={clsx(
            'mx-auto mb-10 grid max-w-[540px] grid-cols-1 items-center text-center',
            'md:mx-0 md:max-w-none md:grid-cols-2'
          )}
        >
          {/* Columna 1: h2 y h3 */}
          <div className="flex flex-col md:text-left lg:max-w-[500px]">
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

      <div className="grid gap-6">
        {data?.bannerPostsItems?.map(
          (
            post: ComponentWithBannerPosts['bannerPostsItems'],
            index: number
          ) => (
            <div key={index}>
              <ItemPostList post={post} index={index} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
