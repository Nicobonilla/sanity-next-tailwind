'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { PageData, useLoadingContext } from '@/context/LoadingContext';
import { Spinner } from '@/components/global/Spinner';
import { ComponentProps, LoadedComponent } from '@/components/types';

const MemoizedComponent = memo(
  ({ Component, dataComponents }: LoadedComponent) => (
    <Component data={dataComponents} />
  )
);

MemoizedComponent.displayName = 'MemoizedComponent';

export default function PageTemplate({ dataPage }: { dataPage?: PageData }) {
  const { isLoading, setLoading, setDataPage } = useLoadingContext();
  const [loadedComponents, setLoadedComponents] = useState<LoadedComponent[]>(
    []
  );
  useEffect(() => {
    if (dataPage) {
      setDataPage(dataPage);

      const loadComponents = async () => {
        if (!dataPage?.components) return;

        try {
          const loaded = await Promise.all(
            dataPage.components.map(async (component) => {
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
                { suspense: true }
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
  }, [dataPage, setDataPage, setLoading]);

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
