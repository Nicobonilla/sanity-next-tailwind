import React, { Suspense, type CSSProperties } from 'react';
import getComponent from '@/components/pages/component/utils/getComponent';
import type { ComponentProps, ComponentWithBannerPosts } from '../types';
import getComponentSkeleton from './skeletons/utils/getComponentSkeleton';
import { getThemeStyle } from './component/Background/utils';

interface PageTemplateProps {
  components: (ComponentProps | ComponentWithBannerPosts)[];
  styleBg?: CSSProperties | undefined;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ components }) => {
  return (
    <div suppressHydrationWarning>
      {components?.map((component, index) => {
        // Calculamos el estilo de manera más eficiente
        let currentStyle: CSSProperties | undefined = undefined;

        if (component?.backgroundValue?.colors && component?.backgroundValue?.layer === 'layer3') {
          // Ahora podemos pasar los datos directamente a getThemeStyle
          // sin necesidad de transformaciones complejas
          currentStyle = getThemeStyle(
            component.backgroundValue.colors,
            component.backgroundValue.directionDeg
          );
        }

        const ComponentToRender = getComponent(component.typeComponentValue || '');
        const Skeleton = getComponentSkeleton(component.typeComponentValue || '');

        return (
          <div key={index}>
            <Suspense fallback={<Skeleton />}>
              <ComponentToRender data={component} styleBg={currentStyle} />
            </Suspense>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PageTemplate);
