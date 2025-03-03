import React from 'react';

// Importar todos los skeletons
import CarouselSkeleton from '../CarouselSkeleton';
import CarouselHeroSkeleton from '../CarouselHeroSkeleton';
import CarouselPostSkeleton from '../CarouselPostSkeleton';
import Banner1Skeleton from '../Banner1Skeleton';
import Banner2Skeleton from '../Banner2Skeleton';
import Banner4ImagesSkeleton from '../Banner4ImagesSkeleton';
import BannerServicesSkeleton from '../BannerServicesSkeleton';
import BreadcrumbsSkeleton from '../BreadcrumbsSkeleton';
import HeadingSkeleton from '../HeadingSkeleton';
import HighLightSkeleton from '../HighLightSkeleton';
import PortableTextAndTocSkeleton from '../PortableTextAndTocSkeleton';
import PostsSkeleton from '../PostsSkeleton';
import ResourcesSkeleton from '../ResourcesSkeleton';

// Definir el tipo para los skeletons
type SkeletonComponent = () => JSX.Element;

// Definir el objeto skeletonMap
const skeletonMap: Record<string, (variant?: string) => SkeletonComponent> = {
  Carousel: (variant?: string) => {
    switch (variant) {
      case 'hero':
        return CarouselHeroSkeleton;
      case 'post':
        return CarouselPostSkeleton; // Puedes crear un PostSkeleton si es necesario
      default:
        return CarouselSkeleton; // Valor por defecto
    }
  },
  Banner1: () => Banner1Skeleton,
  Banner2: () => Banner2Skeleton,
  Banner4Images: () => Banner4ImagesSkeleton,
  BannerServices: () => BannerServicesSkeleton,
  Breadcrumbs: () => BreadcrumbsSkeleton,
  Heading: () => HeadingSkeleton,
  HighLight: () => HighLightSkeleton,
  PortableTextAndToc: () => PortableTextAndTocSkeleton,
  Posts: () => PostsSkeleton,
  Resources: () => ResourcesSkeleton,
};

// Función para obtener el skeleton correspondiente
export default function getComponentSkeleton(
  componentType: string,
  variant?: string
): SkeletonComponent {
  const skeletonResolver = skeletonMap[componentType];

  // Si existe un skeleton para el componentType, lo devuelve; de lo contrario, devuelve un skeleton genérico
  return (
    skeletonResolver?.(variant) ||
    (() => <div className="h-20 animate-pulse bg-gray-100"></div>)
  );
}
