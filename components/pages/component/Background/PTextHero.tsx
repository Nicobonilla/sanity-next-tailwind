import { ComponentProps } from '@/components/types';
import PHeroImage from '@/components/pages/component/HeroImage/PTHeroImage';
import { PortableText, PortableTextComponents } from 'next-sanity';
import clsx from 'clsx';

// Define PT1 and PT2 components
const PT1: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2
        className={clsx(
          'font-bitter text-2xl font-extralight uppercase text-white drop-shadow-2xl',
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
          'mt-3 font-crimson text-lg font-thin leading-5 text-white',
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

export default function PTextHero({ data }: { data: ComponentProps }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div
        className={clsx(
          'relative z-20 flex h-fit flex-col items-center justify-center bg-black/70 px-4 py-8',
          'md:w-4/5 md:max-w-screen-lg md:px-20'
        )}
      >
        <PortableText
          value={data.content || []} // Renderiza el contenido si está disponible
          components={PT1} // Usamos el componente adecuado, con valor por defecto
        />
        <button
          className={clsx(
            'text-md mt-3 min-w-[150px] max-w-[250px] rounded py-2 font-crimson font-light text-white underline transition-all',
            'hover:bg-white/30 hover:font-semibold hover:no-underline',
            'lg:text-lg'
          )}
          aria-label="Seguir para más información"
        >
          Ver Más
        </button>
      </div>
    </div>
  );
}
