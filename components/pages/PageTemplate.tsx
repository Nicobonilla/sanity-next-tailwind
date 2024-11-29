'use client';
import dynamic from 'next/dynamic';
import { useSanityContext } from '@/context/SanityContext';
import {
  GetPageDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';
import Default from '@/components/shared/component/Default';

type ComponentsPageProps = NonNullable<GetPageDetailQueryResult>['components'];
type ComponentPageProps = NonNullable<ComponentsPageProps>[number];

type ComponentsServiceProps =
  NonNullable<GetServiceDetailQueryResult>['components'];
type ComponentServiceProps = NonNullable<ComponentsServiceProps>[number];

export type ComponentsProps = ComponentsPageProps | ComponentsServiceProps;
export type ComponentProps = ComponentPageProps | ComponentServiceProps;

export type ItemsProps = NonNullable<ComponentProps>['items'];
export type ItemProps = NonNullable<ItemsProps>[number];
const DefaultComponent = dynamic(() => import('@/components/shared/component'));
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
    dynamic<{ data: ComponentProps }>(
      () => import(`@/components/shared/component/${name}`),
      {
        loading: () => <div>Cargando...</div>,
        ssr: false,
      }
    );
  // If there are no components, show a message
  if (!dataPage?.components) {
    return <div>No components available</div>;
  }
  console.log('dataPage.components:', dataPage.components);
  const cleanedComponentMap = Object.fromEntries(
    Object.entries(componentsMap).map(([key, value]) => [
      key.replace(/[^\x20-\x7E]/g, ''), // Elimina los caracteres no ASCII (invisibles, etc.)
      value?.replace(/[^\x20-\x7E]/g, ''),
    ])
  );
  console.log('cleanedComponentMap:', cleanedComponentMap);
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
              ? cleanedComponentMap[component.typeComponentValue]
              : 'Banner1';

            if (!componentName) {
              console.error('componentName is null or undefined');
              return <Default key={index} />;
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
