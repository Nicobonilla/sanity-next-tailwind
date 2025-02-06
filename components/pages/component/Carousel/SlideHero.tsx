import { motion } from 'framer-motion';
import { PortableTextComponents } from 'next-sanity';
import Background from '../Background';
import ImageBg from '../Background/ImageBg';
import PTextHero from '../Background/PTextHero';
import { ColorList } from '../Background/utils';
import { ItemProps } from '@/components/types';

type SlideHeroProps = {
  slide: ItemProps;
  layerStyle: ColorList;
  index: number; // Índice del slide actual
  activeIndex: number; // Índice activo del carrusel
};

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

const SlideHero = ({
  slide,
  layerStyle,
  index,
  activeIndex,
}: SlideHeroProps) => {
  const isActive = index === activeIndex; // Determina si el slide está activo

  return (
    <Background
      data={{
        ...slide,
        typeComponent: 'carousel',
        variant: 'hero',
        colors: layerStyle,
      }}
    >
      <motion.div
        key={index} // Usa el índice para forzar el reinicio del efecto
        initial={{ scale: 1.2, opacity: 0.9 }} // Estado inicial
        animate={{
          opacity: isActive ? 1 : 0.9,
          scale: isActive ? 1 : 0.9,
        }}
        transition={{ duration: 5, ease: 'easeOut' }} // Ajusta la duración y la curva de la animación
        className="absolute inset-0"
      >
        <ImageBg imgBg={slide?.image} imgBgType={'dynamic'} />
      </motion.div>

      <PTextHero data={{ content: slide?.content, PTextBanner: 'PT1' }} />
    </Background>
  );
};

export default SlideHero;
