//import { trackButtonClick } from '@/components/lib/GTMTrackers';
import type { ItemProps } from '@/components/types';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import ImageLoader from '../ImageLoader';

export default function Card({
  service,
  index,
}: {
  service: ItemProps;
  index: number;
}) {
  return (
    <div
      className={`group relative grid h-full overflow-hidden rounded-lg hover:cursor-pointer ${index === 0 ? 'lg:row-span-3' : ''
        }${index === 1 ? 'lg:row-span-2' : ''}${index === 2 ? 'lg:col-span-2' : ''
        }${index === 3 ? 'lg:row-span-2' : ''}`}
    >
      <Link
        href={{ pathname: service?.ctaLinkItem }}
        //onClick={() => trackButtonClick(service?.ctaLinkItem, '4ImageBanner')}
        className="relative flex "
      >
        <ImageLoader
          imgBg={service.image}
          className={"transition-transform duration-300 group-hover:scale-110"}
          sizes={"(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33.33vw"} />

        <div className="absolute inset-0 bg-blue-950/60 transition-opacity duration-300 group-hover:bg-blue-950/80 sm:m-3" />
        <div className="absolute inset-0 flex items-end lg:items-center">
          <div className="w-full p-6 lg:px-8">
            <div className="lg:mx-auto lg:max-w-[80%] lg:text-center">
              <PortableText
                value={service.content || []}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mt-2 font-robotoslab text-sm text-white/90 sm:text-base">
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <h3 className="font-montserrat text-xl font-semibold uppercase text-white sm:text-2xl">
                        {children}
                      </h3>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
