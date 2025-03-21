import { type ItemProps } from '@/components/types';
import { PortableText, type PortableTextComponents } from 'next-sanity';
import clsx from 'clsx';
import Link from 'next/link';
//import { trackButtonClick } from '@/components/lib/GTMTrackers';

// Define PT1 and PT2 components
const PT1: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1
        className={clsx(
          'font-robotoslab text-2xl font-extralight uppercase text-white drop-shadow-2xl',
          'lg:text-3xl',
          '2xl:text-3xl'
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={clsx(
          'font-robotoslab text-2xl font-extralight uppercase text-white drop-shadow-2xl',
          'lg:text-3xl',
          '2xl:text-3xl'
        )}
      >
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <span
        className={clsx(
          'mt-3 font-crimson text-lg font-extralight leading-5 text-white',
          'md:mt-5 lg:text-2xl'
        )}
      >
        {children}
      </span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 drop-shadow-4xl font-extrabold text-red-700">
        {children}
      </span>
    ),
  },
};

export default function PTextHero({
  content, link
}: {
  content: ItemProps['content'];
  link: ItemProps['ctaLinkItem'];
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div
        className={clsx(
          'relative z-20 flex h-fit flex-col items-center justify-center bg-black/70 px-4 py-8',
          'md:w-4/5 md:max-w-screen-lg md:px-20'
        )}
      >
        <PortableText
          value={content || []} // Renderiza el contenido si está disponible
          components={PT1} // Usamos el componente adecuado, con valor por defecto
        />
        <Link href={{ pathname: link }} passHref>
          <button
            //onClick={() => trackButtonClick(data.ctaLinkItem, 'CarouselHero')}
            className={clsx('hero-button hover:cursor-pointer z-40',
              'text-md mt-3 min-w-[150px] max-w-[250px] rounded bg-indigo-700 py-2 font-crimson font-light text-white transition-all',
              'hover:bg-indigo-600 hover:font-bold', // Efectos al hacer hover
              'lg:text-lg' // Responsive design para pantallas grandes
            )}
            aria-label="Seguir para más información" // Mejora la accesibilidad
          >
            Ver Más
          </button>
        </Link>
      </div>
    </div>
  );
}
