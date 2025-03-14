import clsx from 'clsx';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { type ComponentProps } from '@/components/types';

export default function Banner1({ data }: { data: ComponentProps }) {
  const { content, imageContent } = data;

  if (!data) {
    return <div>Error al cargar el banner.</div>;
  }

  return (
    <div
      className={clsx(
        'relative mx-auto my-20 flex flex-col justify-between gap-8 px-4',
        'lg:max-w-screen-xl lg:flex-row lg:items-stretch lg:gap-12'
      )}
    >
      {/* Contenido */}
      <div className="relative flex w-full flex-col items-start justify-center space-y-4 lg:w-2/3 lg:translate-y-2">
        <PortableText
          value={content || []}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="relative font-montserrat text-2xl font-light uppercase lg:text-4xl">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-monserrat mt-5 pl-3 text-justify text-lg font-medium uppercase text-red-800 lg:text-xl">
                  {children}
                </h3>
              ),
              normal: ({ children }) => (
                <p className="text-justify font-robotoslab text-sm font-light leading-6 lg:text-base">
                  {children}
                </p>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <div className="pl-5 font-robotoslab text-sm font-light leading-6 lg:text-base">
                  {children}
                </div>
              ),
            },
          }}
        />
      </div>

      {/* Imagen */}
      <div className="relative flex min-h-[500px] w-full lg:sticky lg:top-20 lg:w-1/3">
        <Image
          src={urlForImage(imageContent)?.url() || '/meeting.jpeg'}
          fill
          alt="Banner Image"
          className="absolute inset-0 object-cover"
        />
      </div>
    </div>
  );
}
