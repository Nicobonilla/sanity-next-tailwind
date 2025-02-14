'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/context/LoadingContext';
import { Spinner } from '@/components/global/Spinner';
import {
  GetPageDetailQueryResult,
  GetServiceDetailQueryResult,
  GetUnitBusinessDetailQueryResult,
} from '@/sanity.types';
import { ComponentProps, LoadedComponent } from '@/components/types';

export default function PageTemplate({
  dataPage,
}: {
  dataPage?:
    | GetPageDetailQueryResult
    | GetServiceDetailQueryResult
    | GetUnitBusinessDetailQueryResult;
}) {
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
        <Component key={index} data={dataComponents} />
      ))}
    </div>
  );
}
