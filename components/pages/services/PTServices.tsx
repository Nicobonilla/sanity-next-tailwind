import { urlForImage } from '@/sanity/lib/utils';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';

export const PTServices: PortableTextComponents = {
  block: {
    // Personalizar el renderizado del encabezado h2
    h1: ({ value, children }) => (
      <h1 className="h2 group relative">{children}</h1>
    ),
    h2: ({ value, children }) => (
      <div className="border-l-4 border-red-500 dark:border-red-700">
        <h2 id={`heading-${value._key}`} className="h3 group relative ml-2">
          {children}
        </h2>
      </div>
    ),
    h3: ({ value, children }) => (
      <h3 id={`heading-${value._key}`} className="h3">
        {children}
      </h3>
    ),
    normal: ({ children }) => <span className="p3">{children}</span>,
    blockquote: ({ children }) => (
      <blockquote className="p3 relative flex border-l-4 border-red-500 bg-gray-200 p-4 pl-4 dark:border-red-700 dark:bg-slate-800">
        <span className="pr-3 text-5xl text-red-500">“</span>
        <div>{children}</div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-bold text-red-500">{children}</span>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="callToAction text-gray-900 underline dark:text-gray-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="p3">{children}</ul>,
  },
  types: {
    image: ({ value }) => {
      // Asegurarte de que 'value' tiene la estructura esperada
      if (!value || !value.asset) {
        return null; // O mostrar un componente alternativo
      }

      const imageUrl = urlForImage(value);
      if (!imageUrl) {
        return <p>Imagen no disponible</p>; // O una imagen predeterminada
      }

      return (
        <div className="relative my-5 max-h-[500px] min-h-[350px] w-full overflow-hidden">
          <Image
            alt={value.alt || 'Descripción por defecto'}
            src={imageUrl.url()}
            fill
          />
        </div>
      );
    },
  },
};
