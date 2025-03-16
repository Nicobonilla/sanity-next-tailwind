import Background from '../component/Background';
import clsx from 'clsx';

export default function CarouselHeroSkeleton() {
  // Renderizar directamente el carrusel para variant 'hero'
  return (
    <section className="embla_hero">
            <Background
              data={{
                typeComponent: 'carousel',
                variant: 'hero',
              }}
            >
              <div className="absolute inset-0 flex animate-pulse items-center justify-center text-center">
                <div
                  className={clsx(
                    'relative z-20 flex min-h-[232px] flex-col items-center justify-center bg-black/30 px-4 py-8',
                    'animate-pulse md:w-4/5 md:max-w-screen-lg md:px-20'
                  )}
                >
                  <div className="min-h-[120px]"></div>
                  <button
                    className={clsx(
                      'text-md mt-3 min-w-[150px] max-w-[250px] rounded bg-indigo-700/30 py-2 font-crimson font-light text-white transition-all',
                      'hover:bg-indigo-600 hover:font-bold', // Efectos al hacer hover
                      'animate-pulse lg:text-lg' // Responsive design para pantallas grandes
                    )}
                    aria-label="Seguir para más información" // Mejora la accesibilidad
                  >
                    Ver Más
                  </button>
                </div>
              </div>
            </Background>
    </section>
  );
}
