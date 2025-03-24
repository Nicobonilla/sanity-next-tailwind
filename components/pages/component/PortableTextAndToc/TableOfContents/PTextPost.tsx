import { urlForImage } from '@/sanity/lib/utils';
import { type PortableTextComponents } from 'next-sanity';
import Image from 'next/image';

export const PTextPost: PortableTextComponents = {
  block: {
    // Personalizar el renderizado del encabezado h2
    h2: ({ value, children }) => (
      <div className="border-l-4 border-red-500 my-4 lg:mt-16">
        <h2 id={`heading-${value._key}`}
          className="font-robotoslab text-pretty text-xl font-semibold text-slate-700 lg:text-2xl group relative ml-2">
          {children}
        </h2>
      </div>
    ),
    h3: ({ value, children }) => (
      <h3 id={`heading-${value._key}`}
        className="ml-4 mt-4 font-robotoslab text-xl font-semibold text-slate-700 lg:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="ml-2 mt-4 font-robotoslab font-semibold text-slate-700 lg:text-lg" >
        {children}
      </h4 >
    ),
    normal: ({ children }) => <p className="p3">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="p3 relative flex border-l-4 border-red-500 bg-gray-200 px-4 py-2">
        <span className="pr-3 text-5xl text-red-500">“</span>
        <div>{children}</div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-semibold text-slate-800">{children}</span>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="callToAction text-gray-900 underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <div className='py-1 px-2'>
        <ul className="p3 ml-8 list-disc">
          {children}
        </ul>
      </div>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className=" ">{children}</li>
    ),
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
