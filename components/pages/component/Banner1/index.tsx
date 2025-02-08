import clsx from 'clsx';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import PTBanner, { type PTBannerType } from '../BannerWithItems/PTextBanner';
import { ComponentProps } from '@/components/types';

export default function Banner1({ data }: { data: ComponentProps }) {
  const { content, imageContent, invertLayoutMobile, invertLayoutDesk } = data;
  console.log('data: ', data);
  if (data) {
    return (
      <div
        className={clsx(
          'relative mx-auto my-20 flex items-center gap-8 px-4',
          invertLayoutMobile ? 'flex-col' : 'flex-col-reverse',
          'md:justify-between',
          invertLayoutDesk ? 'lg:flex-row' : 'lg:flex-row-reverse',
          'lg:max-w-screen-xl'
        )}
      >
        {/* Imagen */}
        <div className="relative h-[400px] w-full lg:w-1/2">
          <Image
            src={urlForImage(imageContent)?.url() || '/meeting.jpeg'}
            fill
            alt="Banner Image"
            className="object-contain"
          />
        </div>
        {/* Contenido */}
        <div className="relative flex w-full max-w-[700px] flex-col items-start justify-center space-y-4 lg:w-1/2">
          <PortableText
            value={content || []}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className="font-fira relative text-2xl font-light uppercase lg:text-4xl">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-monserrat mt-5 pl-3 text-justify text-lg font-medium uppercase text-red-800 lg:text-xl">
                    {children}
                  </h2>
                ),
                normal: ({ children }) => (
                  <p className="text-justify font-bitter text-sm font-light leading-6 lg:text-base">
                    {children}
                  </p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <div className="pl-5 font-bitter text-sm font-light leading-6 lg:text-base">
                    {children}
                  </div>
                ),
              },
            }}
          />
        </div>
      </div>
    );
  } else {
    return <div>Error al cargar el banner.</div>;
  }
}
