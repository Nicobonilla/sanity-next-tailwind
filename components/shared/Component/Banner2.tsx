import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { PTextBanner } from '../PortableText/PTextBanner';
import { ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';

export default function Banner1({ data }: { data: ComponentProps }) {
  if (data) {
    return (
      <div
        className={clsx(
          'form-h relative overflow-hidden p-8',
          'md:p-0 md:px-2'
        )}
      >
        <Image
          src={urlForImage(data.image)?.url() || '/meeting.jpeg'}
          alt="Home page image"
          className="object-cover object-bottom md:object-center"
          quality={100}
          fill
        />
        <div
          className={clsx(
            'xs5:py-5 absolute inset-x-0 top-0 z-0 h-fit rounded-xl bg-blue-900',
            'shadow-2xl md:left-auto md:right-0 md:top-10 md:w-2/5'
          )}
        >
          <div
            className={clsx(
              'relative z-10 mx-auto max-w-md items-center justify-center p-5 dark:text-slate-200',
              'md:mx-0 md:md:p-2'
            )}
          >
            <div className="my-auto w-full flex-col items-center justify-center pr-5 text-right md:mt-5">
              <h2 className="mb-2 w-full bg-white pr-4 font-crimson text-2xl font-extrabold uppercase text-gray-800 dark:text-red-500">
                Desarrollo de Software
              </h2>
              <h2 className="mb-4 pl-10 font-montserrat text-lg font-thin text-white drop-shadow-xl ">
                Nuestro objetivo es diseñar el servicio adecuado a tus
                necesidades, oportunidades y posibilidades. Con visión
                estratégica para mejorar los resultados de tu empresa
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Error al cargar el banner.</div>;
  }
}
