import dynamic from 'next/dynamic';

import { ComponentProps, ComponentsProps } from '@/components/types';

type ComponentImporter = () => Promise<unknown>;

const componentImporters: Record<string, ComponentImporter> = {
  background: () => import('@/components/pages/component/Background'),
  banner1: () => import('@/components/pages/component/Banner1'),
  banner2: () => import('@/components/pages/component/Banner2'),
  banner4images: () => import('@/components/pages/component/Banner4Images'),
  bannerlist: () => import('@/components/pages/component/BannerList'),
  bannerposts: () => import('@/components/pages/component/BannerPosts'),
  bannerservices: () => import('@/components/pages/component/BannerServices'),
  bannerwithitems: () => import('@/components/pages/component/BannerWithItems'),
  carousel: () => import('@/components/pages/component/Carousel'),
  default: () => import('@/components/pages/component/Default'),
  heading: () => import('@/components/pages/component/Heading'),
  heroform: () => import('@/components/pages/component/HeroForm'),
  heroimage: () => import('@/components/pages/component/HeroImage'),
  herovideo: () => import('@/components/pages/component/HeroVideo'),
  highlight: () => import('@/components/pages/component/HighLight'),
  posts: () => import('@/components/pages/component/Posts'),
  resources: () => import('@/components/pages/component/Resources'),
};

function normalizeComponentType(type?: string | null) {
  return type?.replace(/\s+/g, '').toLowerCase() || 'default';
}

function getDynamicComponent(type?: string | null) {
  const normalizedType = normalizeComponentType(type);

  return dynamic<{ data: ComponentProps }>(
    (componentImporters[normalizedType] || componentImporters.default) as never
  );
}

const PageTemplate = ({ components }: { components?: ComponentsProps }) => {
  return (
    <div className="opacity-100 transition-opacity duration-300">
      {(components || []).map((component: ComponentProps, index: number) => {
        const Component = getDynamicComponent(component.typeComponentValue);

        return (
          <Component
            key={`component-${index}-${component.typeComponentValue}`}
            data={component}
          />
        );
      })}
    </div>
  );
};

export default PageTemplate;
