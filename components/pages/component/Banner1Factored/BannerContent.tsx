import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import PTBanner, {
  type PTtype,
} from '@/components/pages/component/BannerWithItems/PTextBanner';

interface BannerContentProps {
  variant: string;
  content: any;
  image: any;
  layout: any;
  PTextBanner?: keyof PTtype; // Mantenemos el tipo original
}

export function BannerContent({
  variant,
  content,
  image,
  layout,
  PTextBanner: textStyle, // Renombramos para mantener la consistencia con el schema
}: BannerContentProps) {
  // Usamos el componente PTBanner existente
  const selectedComponent = textStyle ? PTBanner[textStyle] : PTBanner.PT1;

  if (variant === 'withSideImage') {
    return (
      <>
        <div className="responsive-image-1 relative flex h-3/5 flex-row md:mb-0">
          <Image
            src={urlForImage(image)?.url() || '/placeholder.jpg'}
            fill
            alt="Banner Image"
            className="object-contain"
          />
        </div>
        <div className="lg:max-w-1/3 relative flex max-w-[470px] flex-col items-start justify-center">
          <PortableText value={content || []} components={selectedComponent} />
        </div>
      </>
    );
  }

  if (variant === 'overlay') {
    return (
      <>
        <Image
          src={urlForImage(image)?.url() || '/placeholder.jpg'}
          alt="Banner image"
          className="object-cover object-bottom md:object-center"
          quality={100}
          fill
        />
        <div
          className={clsx(
            'absolute inset-x-0 top-0 z-0 h-fit bg-blue-900 xs5:py-5',
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
              <PortableText
                value={content || []}
                components={selectedComponent}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={clsx(
        'mx-auto flex flex-col items-center justify-center py-8',
        layout?.imagePosition === 'background' ? 'text-white' : 'text-current',
        'max-w-[650px] px-4 md:max-w-[1350px]'
      )}
      style={
        layout?.imagePosition === 'background' && image
          ? {
              backgroundImage: `url(${urlForImage(image)?.url()})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
            }
          : {}
      }
    >
      {layout?.imagePosition === 'background' && (
        <div className="absolute inset-0 z-10 bg-black/60" />
      )}
      {content && (
        <div className="relative z-20 mb-8 text-center">
          <PortableText value={content} components={selectedComponent} />
        </div>
      )}
    </div>
  );
}
