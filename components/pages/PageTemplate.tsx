'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import getComponentSkeleton from '@/components/pages/skeletons/utils/getComponentSkeleton';
import { ComponentProps, ComponentsProps } from '@/components/types';

type PageBuilderComponent = ComponentType<{ data: ComponentProps }>;

function loadComponent(
  type: string,
  loader: () => Promise<{ default: ComponentType<any> }>,
  variant?: string
) {
  return dynamic(loader, {
    loading: () => {
      const Skeleton = getComponentSkeleton(type, variant);
      return <Skeleton />;
    },
  });
}

const componentRegistry: Record<string, PageBuilderComponent> = {
  Banner1: loadComponent('Banner1', () => import('./component/Banner1')),
  Banner2: loadComponent('Banner2', () => import('./component/Banner2')),
  Banner4Images: loadComponent(
    'Banner4Images',
    () => import('./component/Banner4Images')
  ),
  BannerList: loadComponent(
    'BannerList',
    () => import('./component/BannerList')
  ),
  BannerPosts: loadComponent(
    'BannerPosts',
    () => import('./component/BannerPosts')
  ),
  BannerServices: loadComponent(
    'BannerServices',
    () => import('./component/BannerServices')
  ),
  BannerWithItems: loadComponent(
    'BannerWithItems',
    () => import('./component/BannerWithItems')
  ),
  Carousel: loadComponent('Carousel', () => import('./component/Carousel')),
  Heading: loadComponent('Heading', () => import('./component/Heading')),
  HeroForm: loadComponent('HeroForm', () => import('./component/HeroForm')),
  HeroImage: loadComponent('HeroImage', () => import('./component/HeroImage')),
  HeroVideo: loadComponent('HeroVideo', () => import('./component/HeroVideo')),
  HighLight: loadComponent('HighLight', () => import('./component/HighLight')),
  Resources: loadComponent('Resources', () => import('./component/Resources')),
};

const DefaultComponent = dynamic<{ data: ComponentProps }>(
  () => import('./component/Default')
);

const getDynamicComponent = (type: string) =>
  componentRegistry[type] || DefaultComponent;

const PageTemplate = ({ components }: { components?: ComponentsProps }) => {
  return (
    <div className="opacity-100 transition-opacity duration-300">
      {components?.map((data: ComponentProps, index: number) => {
        const Component = getDynamicComponent(data.typeComponentValue);
        const key =
          '_key' in data && data._key
            ? data._key
            : `${data.typeComponentValue}-${index}`;

        return <Component key={key} data={data} />;
      })}
    </div>
  );
};

export default PageTemplate;
