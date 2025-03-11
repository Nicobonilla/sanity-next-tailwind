// src/components/pages/PageTemplate.tsx
import React, { memo } from 'react';
import getComponent from '@/components/pages/component/utils/getComponent';
import getComponentSkeleton from '@/components/pages/skeletons/utils/getComponentSkeleton';
import { ComponentProps, ComponentsProps } from '../types';


const PageTemplate: React.FC<ComponentsProps> = ({ components }) => {
  console.log('components: ', components[0]);
  return (
    <div suppressHydrationWarning>
      {components.map((component: ComponentProps, index:number) => {
        const ComponentToRender = getComponent(component.typeComponentValue, component.variant);
        const Skeleton = getComponentSkeleton(component.typeComponentValue, component.variant);

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
