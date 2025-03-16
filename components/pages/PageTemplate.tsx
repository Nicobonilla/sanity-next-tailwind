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
      {components?.map((component, index) => {
        const ComponentToRender = getComponent(component.typeComponentValue || '');
        const Skeleton = getComponentSkeleton(component.typeComponentValue || '');

        return (
          <div key={index}>
            {/* Renderizar el skeleton en el servidor */}
            <noscript>
              <Skeleton />
            </noscript>

            {/* Renderizar el componente directamente en SSR */}
            <ComponentToRender data={component} />
          </div>
        );
      })}
    </div>
  );
};

// Optimización con React.memo para evitar renders innecesarios
export default memo(PageTemplate);
