'use client';
import dynamic from 'next/dynamic';
import { useSanityContext } from '@/context/SanityContext';
import {
  GetPageDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';

import Default from './Default';

type ComponentsPageProps = NonNullable<GetPageDetailQueryResult>['components'];
type ComponentPageProps = NonNullable<ComponentsPageProps>[number];

type ComponentsServiceProps =
  NonNullable<GetServiceDetailQueryResult>['components'];
type ComponentServiceProps = NonNullable<ComponentsServiceProps>[number];

export type ComponentsProps = ComponentsPageProps | ComponentsServiceProps;
export type ComponentProps = ComponentPageProps | ComponentServiceProps;

export type ItemsProps = NonNullable<ComponentProps>['items'];
export type ItemProps = NonNullable<ItemsProps>[number];

// Componente de página
export default function PageTemplate({
  dataPage,
}: {
  dataPage?: GetPageDetailQueryResult | GetServiceDetailQueryResult;
}) {
  // Dynamically load the component based on its name
  const { componentsMap } = useSanityContext();
  console.log('componentsMap: ', componentsMap);

  const DynamicComponent = (name: string) =>
    dynamic<{ data: ComponentProps }>(() => import(`./component/${name}`), {
      loading: () => <div>Cargando...</div>,
      ssr: false,
    });
  // If there are no components, show a message
  if (!dataPage?.components) {
    return <div>No components available</div>;
  }
  console.log('dataPage.components:', dataPage.components);
  return (
    <>
      {dataPage?.components &&
        dataPage.components.map(
          (
            component: ComponentPageProps | ComponentServiceProps,
            index: number
          ) => {
            // Get the component name from the typeComponentValue
            const componentName = component?.typeComponentValue
              ? component.typeComponentValue.charAt(0).toUpperCase() +
                component.typeComponentValue.slice(1)
              : 'Default';

            if (!componentName) {
              console.error('componentName is null or undefined');
              return <Default key={index} />;
            }

            // Dynamically load the component
            const DComponent = DynamicComponent(componentName);
            if (DComponent == null || DComponent == undefined) {
              console.error('DynamicComponent is null or undefined');
              return <Default key={index} />;
            }

            // Render the dynamic component or an error message
            return (
              <DComponent key={index} data={component as ComponentProps} />
            );
          }
        )}
    </>
  );
}
