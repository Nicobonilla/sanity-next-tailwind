import Image from 'next/image';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';

export const PText: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="mb-2 text-2xl font-bold text-white">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-sm opacity-90">{children}</p>
    ),
  },
};

interface SlideProps {
  slide: any;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Slide = ({ slide, isActive, onMouseEnter, onMouseLeave }: SlideProps) => {
  return (
    <div
      className="relative w-[90%] md:w-[46%] lg:w-[28%]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="group relative aspect-[3/4] h-[500px] w-full overflow-hidden lg:h-[400px]">
        <Image
          src={urlForImage(slide?.image)?.url() || '/meeting.jpeg'}
          alt={'alt'}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div
          className={clsx(
            'absolute inset-x-0 bottom-0 flex h-[250px] flex-col justify-end bg-gradient-to-t from-blue-700/90 to-purple-700/90 p-6 text-white',
            'lg:absolute lg:bottom-0 lg:h-full lg:justify-end lg:bg-gradient-to-b lg:from-transparent lg:to-purple-700/90 lg:opacity-0 lg:transition-opacity lg:duration-300',
            isActive && 'lg:opacity-100'
          )}
        >
          {slide.content && (
            <PortableText
              value={slide.content || []}
              components={PText as PortableTextComponents}
            />
          )}
          <button className="w-1/3 rounded-md border border-white bg-transparent py-1 text-white hover:cursor-pointer hover:bg-white hover:text-primary hover:shadow-md">
            {'Seguir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
