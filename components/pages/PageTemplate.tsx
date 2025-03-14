import React, { memo } from 'react';
import getComponent from '@/components/pages/component/utils/getComponent';
import type { ComponentProps, ComponentWithBannerPosts } from '../types';
import getComponentSkeleton from './skeletons/utils/getComponentSkeleton';

interface PageTemplateProps {
  components: (ComponentProps | ComponentWithBannerPosts)[];
}

const PageTemplate: React.FC<PageTemplateProps> = ({ components }) => {
  return (
    <div suppressHydrationWarning>
      {components?.map((component: (ComponentProps | ComponentWithBannerPosts), index: number) => {
        const ComponentToRender = getComponent(component.typeComponentValue || '');
        const Skeleton = getComponentSkeleton(component.typeComponentValue || '');

        return (
          <React.Suspense key={index} fallback={<Skeleton />}>
            <ComponentToRender data={component} />
          </React.Suspense>
        );
      })}
    </div>
  );
};

// Optimización con React.memo para evitar renders innecesarios
export default memo(PageTemplate);
