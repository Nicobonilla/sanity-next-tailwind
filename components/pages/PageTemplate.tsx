'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { useLoadingContext } from '@/context/LoadingContext';
import { Spinner } from '@/components/global/Spinner';
import { ComponentProps, LoadedComponent } from '@/components/types';

const MemoizedComponent = memo(
  ({ Component, dataComponents }: LoadedComponent) => (
    <Component data={dataComponents} />
  )
);

MemoizedComponent.displayName = 'MemoizedComponent';

export default function PageTemplate({
  components,
}: {
  components?: ComponentProps;
}) {
  const { isLoading, setLoading, setComponents } = useLoadingContext();
  const [loadedComponents, setLoadedComponents] = useState<LoadedComponent[]>(
    []
  );

  useEffect(() => {
    if (components) {
      setComponents(components);

      const loadComponents = async () => {
        if (!components) return;

        try {
          const loaded = await Promise.all(
            components.map((component: ComponentProps[number]) => {
              const componentName = component?.typeComponentValue
                ? component.typeComponentValue.charAt(0).toUpperCase() +
                  component.typeComponentValue.slice(1)
                : 'Default';

              const DynamicComponent = dynamic<{ data: ComponentProps }>(
                () =>
                  import(`./component/${componentName}`).catch(() => {
                    console.error(`Failed to load component: ${componentName}`);
                    return import('./component/Default'); // Fallback component
                  }),
                { suspense: false }
              );

              return {
                dataComponents: component,
                Component: DynamicComponent,
              } satisfies LoadedComponent;
            })
          );
          setLoadedComponents(loaded);
          setLoading(false);
        } catch (error) {
          console.error('Error loading components:', error);
          setLoading(false);
        }
      };

      loadComponents();
    }
  }, [components, setComponents, setLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="opacity-100 transition-opacity duration-300">
      {loadedComponents.map(({ Component, dataComponents }, index) => (
        <MemoizedComponent
          key={index}
          Component={Component}
          dataComponents={dataComponents}
        />
      ))}
    </div>
  );
}
