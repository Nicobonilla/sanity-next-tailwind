import type { ComponentProps, ItemProps } from '@/components/types';
import { PortableText, PortableTextComponents } from 'next-sanity';
import Card from './Card';
import clsx from 'clsx';

export default function Banner4Images({ data }: { data: ComponentProps }) {
  return (
    <section
      className={clsx(
        'w-full bg-gradient-to-br from-blue-950 to-blue-800 py-12',
        'md:py-16 lg:items-center lg:justify-center lg:py-20'
      )}
    >
      <div className="mx-auto h-fit px-4 lg:w-fit">
        <div className="mb-12 text-center">
          <PortableText
            value={data.content || []}
            components={
              {
                block: {
                  h2: ({ children }) => (
                    <h2
                      className={clsx(
                        'mb-4 font-robotoslab text-2xl font-light uppercase text-white drop-shadow-sm',
                        'lg:text-3xl 2xl:text-3xl'
                      )}
                    >
                      {children}
                    </h2>
                  ),
                  normal: ({ children }) => (
                    <p className="mx-auto text-center font-crimson text-lg font-light text-white/90">
                      {children}
                    </p>
                  ),
                },
              } as PortableTextComponents
            }
          />
        </div>

        <div
          className={clsx(
            'grid min-h-[800px] gap-4',
            'md:grid-cols-2 lg:h-[700px] lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-3'
          )}
        >
          {data.items?.map((service: ItemProps, index: number) => (
            <Card key={index} index={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
