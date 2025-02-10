import type { ComponentProps, ItemProps } from '@/components/types';
import { PortableText } from 'next-sanity';
import Card from './Card';
import { PTextBannerLight } from '../PTextComponents';
import clsx from 'clsx';

export default function Banner4Images({ data }: { data: ComponentProps }) {
  //bg-[#002B4E]
  return (
    <section
      className={clsx(
        'w-full bg-gradient-to-br from-bodydark to-blue-900 py-12',
        'md:py-16 lg:items-center lg:justify-center lg:py-20'
      )}
    >
      <div className="mx-auto h-fit px-4 lg:w-fit">
        <div className="mb-12 text-center">
          <PortableText
            value={data.content || []}
            components={PTextBannerLight}
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
