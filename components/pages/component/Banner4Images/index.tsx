import Image from 'next/image';
import { type ComponentProps } from '../../PageTemplate';
import { PortableText } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/utils';
import { type ItemProps } from '../../types';

function ServiceCard({
  service,
  index,
}: {
  service: ItemProps;
  index: number;
}) {
  console.log('key', index);
  console.log('service', service);
  return (
    <div
      className={`group relative grid overflow-hidden rounded-lg hover:cursor-pointer lg:items-center lg:justify-center ${index == 0 ? 'lg:row-span-3' : ''}${index == 1 ? 'lg:row-span-2' : ''}${index == 2 ? 'lg:col-span-2' : ''}${index == 3 ? 'lg:row-span-2' : ''}`}
    >
      <Image
        src={urlForImage(service.image)?.url() || '/meeting.jpeg'}
        alt={'title'}
        fill
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-blue-950/50 transition-opacity duration-300 group-hover:bg-blue-950/70 lg:m-3" />
      <div className="absolute inset-x-0 bottom-0 h-fit p-6 lg:inset-0 lg:my-auto lg:text-center">
        <PortableText
          value={service.content || []}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mt-2 font-bitter text-sm text-white/90 sm:text-base">
                  {children}
                </p>
              ),
              h1: ({ children }) => (
                <h3 className="font-montserrat text-xl font-bold text-white sm:text-2xl">
                  {children}
                </h3>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default function Banner4Images({ data }: { data: ComponentProps }) {
  return (
    <section className="w-full bg-[#002B4E] py-12 md:py-16 lg:items-center lg:justify-center lg:py-20">
      <div className="mx-auto h-fit px-4 lg:w-fit">
        <div className="mb-12 text-center">
          <PortableText
            value={data.content || []}
            components={{
              block: {
                h1: ({ children }) => (
                  <h2 className="mb-4 font-montserrat text-3xl font-bold text-white sm:text-4xl">
                    {children}
                  </h2>
                ),
                normal: ({ children }) => (
                  <p className="mx-auto text-center font-bitter text-lg text-white/90">
                    {children}
                  </p>
                ),
              },
            }}
          />
        </div>

        <div className="grid min-h-[800px] gap-4 md:grid-cols-2 lg:h-[700px] lg:w-[1000px] lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-3">
          {data.items?.map((service, index) => (
            <ServiceCard key={index} index={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
