import dynamic from 'next/dynamic';

// Carga dinámica de componentes (solo se renderizan cuando se usan)
const componentsMap: { [key: string]: React.ComponentType<any> } = {
  Banner1: dynamic(() => import('@/components/pages/component/Banner1')),
  Banner2: dynamic(() => import('@/components/pages/component/Banner2')),
  Banner4Images: dynamic(() => import('@/components/pages/component/Banner4Images')),
  BannerServices: dynamic(() => import('@/components/pages/component/BannerServices')),
  Carousel: dynamic(() => import('@/components/pages/component/Carousel')),
  Heading: dynamic(() => import('@/components/pages/component/Heading')),
  HighLight: dynamic(() => import('@/components/pages/component/HighLight')),
  PortableTextAndToc: dynamic(() => import('@/components/pages/component/PortableTextAndToc')),
  Posts: dynamic(() => import('@/components/pages/component/Posts')),
  Resources: dynamic(() => import('@/components/pages/component/Resources')),
};

// Función para obtener el componente dinámico
export default function getComponent(componentType: string, variant?: string) {
  return componentsMap[componentType] || (() => <div>Componente no encontrado</div>);
}