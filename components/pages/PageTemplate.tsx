'use client';

import dynamic from 'next/dynamic';
import getComponentSkeleton from '@/components/pages/skeletons/utils/getComponentSkeleton';
import { ComponentProps, ComponentsProps } from '@/components/types';

const componentDirectoryMap: Record<string, string> = {
  banner1: 'Banner1',
  banner2: 'Banner2',
  banner4Images: 'Banner4Images',
  bannerList: 'BannerList',
  bannerPosts: 'BannerPosts',
  bannerServices: 'BannerServices',
  bannerWithItems: 'BannerWithItems',
  breadcrumbs: 'Breadcrumbs',
  carousel: 'Carousel',
  heading: 'Heading',
  heroForm: 'HeroForm',
  heroImage: 'HeroImage',
  heroVideo: 'HeroVideo',
  highLight: 'HighLight',
  portableTextAndToc: 'PortableTextAndToc',
  posts: 'Posts',
  resources: 'Resources',
  background: 'Background',
};

const resolveComponentDirectory = (type?: string) =>
  (type && componentDirectoryMap[type]) || type || 'Default';

// Functions
const getDynamicComponent = (type: string, variant?: string) =>
  dynamic<{ data: ComponentProps }>(
    () =>
      import(`@/components/pages/component/${resolveComponentDirectory(type)}`).catch(
        () => import('@/components/pages/component/Default')
      ),
    {
      loading: () => {
        const Skeleton = getComponentSkeleton(
          resolveComponentDirectory(type),
          variant
        );
        return <Skeleton />;
      },
    }
  );

// Main Component
const PageTemplate = ({ components }: { components?: ComponentsProps }) => {
  return (
    <div className="opacity-100 transition-opacity duration-300">
      {(components || []).map((component: ComponentProps, index: number) => {
        const Component = getDynamicComponent(
          component.typeComponentValue,
          component.variant
        );

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
