import dynamic from 'next/dynamic';

import { ComponentProps, ComponentsProps } from '@/components/types';

type ComponentImporter = () => Promise<unknown>;

const componentImporters: Record<string, ComponentImporter> = {
  background: () => import('@/components/pages/component/Background'),
  banner1: () => import('@/components/pages/component/Banner1'),
  banner2: () => import('@/components/pages/component/Banner2'),
  banner4Images: () => import('@/components/pages/component/Banner4Images'),
  bannerList: () => import('@/components/pages/component/BannerList'),
  bannerPosts: () => import('@/components/pages/component/BannerPosts'),
  bannerServices: () => import('@/components/pages/component/BannerServices'),
  bannerWithItems: () => import('@/components/pages/component/BannerWithItems'),
  carousel: () => import('@/components/pages/component/Carousel'),
  default: () => import('@/components/pages/component/Default'),
  heading: () => import('@/components/pages/component/Heading'),
  heroForm: () => import('@/components/pages/component/HeroForm'),
  heroImage: () => import('@/components/pages/component/HeroImage'),
  heroVideo: () => import('@/components/pages/component/HeroVideo'),
  highLight: () => import('@/components/pages/component/HighLight'),
  posts: () => import('@/components/pages/component/Posts'),
  resources: () => import('@/components/pages/component/Resources'),
};

function getDynamicComponent(type?: string | null) {
  return dynamic<{ data: ComponentProps }>(
    (componentImporters[type || ''] || componentImporters.default) as never
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
