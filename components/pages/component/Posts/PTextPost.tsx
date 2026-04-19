import type { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

import { slugify } from '@/lib/slugify';
import { urlForImage } from '@/sanity/lib/image-utils';

export const PTextPost: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <div className="border-l-4 border-red-500 dark:border-red-700">
        <h2
          id={`heading-${slugify(children?.toString() || '')}`}
          className="h3 group relative ml-2"
        >
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <h3 id={`heading-${slugify(children?.toString() || '')}`} className="h3">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p className="p3">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="p3 relative flex border-l-4 border-red-500 bg-gray-200 p-4 dark:border-red-700 dark:bg-slate-800">
        <span className="pr-3 text-5xl text-red-500">&quot;</span>
        <div>{children}</div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-semibold text-red-600">{children}</span>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          className="callToAction text-gray-900 underline dark:text-gray-300"
          rel={isExternal ? 'noreferrer noopener' : undefined}
          target={isExternal ? '_blank' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="p3 list-disc pl-5">{children}</ul>,
    number: ({ children }) => (
      <ol className="p3 list-decimal pl-5">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value || !value.asset) {
        return null;
      }

      const imageUrl = urlForImage(value);
      if (!imageUrl) {
        return <p>Imagen no disponible</p>;
      }

      return (
        <div className="relative my-5 max-h-[500px] min-h-[350px] w-full overflow-hidden">
          <Image
            alt={value.alt || 'Imagen del contenido'}
            src={imageUrl.url()}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      );
    },
  },
};
