'use client';
import dynamic from 'next/dynamic';
import { useAppContext } from '@/context/AppContext';
import {
  GetPageDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';

type ComponentsPageProps = NonNullable<GetPageDetailQueryResult>['components'];
type ComponentPageProps = NonNullable<ComponentsPageProps>[number];

type ComponentsServiceProps =
  NonNullable<GetServiceDetailQueryResult>['components'];
type ComponentServiceProps = NonNullable<ComponentsServiceProps>[number];

export type ComponentsProps = ComponentsPageProps | ComponentsServiceProps;
export type ComponentProps = ComponentPageProps | ComponentServiceProps;

// Componente de página
export default function PageTemplate({
  dataPage,
}: {
  dataPage?: GetPageDetailQueryResult | GetServiceDetailQueryResult;
}) {
  // Dynamically load the component based on its name
  const { componentsMap } = useAppContext();

  const DynamicComponent = (name: string) =>
    dynamic<{ data: ComponentProps }>(() =>
      import(`@/components/shared/Component/${name}`).catch(
        () => import('@/components/shared/Component/Default')
      )
    );

  // If there are no components, show a message
  if (!dataPage?.components) {
    return <div>No components available</div>;
  }

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
              ? componentsMap[component.typeComponentValue]
              : null;

            if (!componentName) {
              console.error('componentName is null or undefined');
              return <div key={index}>COMPONENTE NO ENCONTRADO</div>;
            }

            // Dynamically load the component
            const DComponent = DynamicComponent(componentName);

            // Render the dynamic component or an error message
            return (
              <DComponent key={index} data={component as ComponentProps} />
            );
          }
        )}
    </>
  );
}
