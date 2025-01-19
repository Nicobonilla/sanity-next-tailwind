'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/context/LoadingContext';
import { Spinner } from '@/components/global/Spinner';
import {
  GetPageDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';
import Background from './component/Background';

// Definiciones de tipos
type ComponentsPageProps = NonNullable<GetPageDetailQueryResult>['components'];
type ComponentPageProps = NonNullable<ComponentsPageProps>[number];

type ComponentsServiceProps =
  NonNullable<GetServiceDetailQueryResult>['components'];
type ComponentServiceProps = NonNullable<ComponentsServiceProps>[number];

export type ComponentsProps = ComponentsPageProps | ComponentsServiceProps;
export type ComponentProps = ComponentPageProps | ComponentServiceProps;

// Tipo para el componente dinámico
type DynamicComponentType = React.ComponentType<{
  data: ComponentProps;
}>;

// Tipo para los componentes cargados
interface LoadedComponent {
  data: ComponentProps;
  Component: DynamicComponentType;
}

export default function PageTemplate({
  dataPage,
}: {
  dataPage?: GetPageDetailQueryResult | GetServiceDetailQueryResult;
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
                {
                  ssr: true,
                  loading: () => null,
                }
              );

              return {
                data: component,
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

  if (
    isLoading ||
    (dataPage?.components &&
      loadedComponents.length < dataPage?.components?.length)
  ) {
    return <Spinner />;
  }

  return (
    <div className="opacity-100 transition-opacity duration-300">
      {loadedComponents.map(({ Component, data }, index) => (
        <Component key={index} data={data} />
      ))}
    </div>
  );
}
