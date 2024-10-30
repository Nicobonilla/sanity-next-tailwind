import { urlForImage } from '@/sanity/lib/utils';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';

export const PTheroImage: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <div className="mt-5 font-robotomono font-light leading-5 text-white md:text-xl lg:text-2xl">
        <span>{children}</span>
      </div>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-bold text-red-500">{children}</span>
    ),
  },
};
