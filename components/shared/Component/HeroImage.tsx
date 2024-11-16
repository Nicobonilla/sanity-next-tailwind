import {
  PTheroImage,
  PTheroImage2,
} from '@/components/shared/PortableText/PTheroImage';
import { Banner } from '@/sanity.types';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText, PortableTextComponents } from 'next-sanity';
import Image from 'next/image';

type HeroImageProps = {
  data: Banner | null;
  stylePortableText: PortableTextComponents;
};

export default function HeroImage(props: HeroImageProps) {
  if (!props.data) {
    return <div>Error al cargar el banner.</div>;
  }
  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={urlForImage(props.data.image)?.url() || '/meeting.jpeg'}
        alt={'Home page image'}
        className="size-full object-cover object-top"
        quality={100}
        fill
      />
      <div className="layer bg-red-700/60"></div>
      <div className="layer layer1 z-10 bg-gray-100 dark:bg-bodydark"></div>
      <div className="layer layer2 bg-gray-100/70 dark:bg-bodydark/60"></div>
      <div className="layer layer3 bg-gray-100/40 dark:bg-bodydark/40"></div>

      <div className="layer flex items-center justify-center">
        <div className="align-left relative z-20 my-auto flex h-1/2 flex-col justify-center px-4 sm:-translate-y-20 md:w-4/5 md:px-0">
          <PortableText
            value={props.data.content || []}
            components={ PTheroImage2 }
          />
          <button className="mt-5 flex max-w-[250px] items-center justify-center rounded border-2 border-second-400 py-2 font-light text-white hover:border-0 hover:bg-white/30 hover:font-bold">
            SEGUIR
          </button>
        </div>
      </div>
    </div>
  );
}
