import dynamic from 'next/dynamic';
import { Component, getCurrentPage, SanPage } from '@/sanity/fetchs/pagesFetch';
import { GetComponentListQueryResult } from '@/sanity.types';
import { getComponentListFetch } from '@/sanity/lib/fetch';

// Función para transformar la lista de componentes en un diccionario
function transformToDict(
  components: GetComponentListQueryResult | null
): Record<string, string | null> {
  if (!components) return {};

  return components.reduce(
    (acc, { value, name }) => {
      if (value) {
        acc[value] = name; // Asigna el value al nombre en el diccionario
      }
      return acc; // Devuelve el acumulador
    },
    {} as Record<string, string | null>
  );
}

// Componente de página
export default async function PageTemplate({
  service,
}: {
  service?: string | undefined;
}) {
  // Obtener datos de la página actual
  const currentPage: SanPage | null | undefined = await getCurrentPage(service);

  console.log('currentPage', currentPage);
  if (!currentPage) {
    return <div>Error al cargar la lista de páginas.</div>;
  }

  // Obtener datos de los componentes
  const componentList: GetComponentListQueryResult | null =
    await getComponentListFetch();

  // Crear un mapa de componentes
  const componentMap = transformToDict(componentList);
  console.log('componentMap', componentMap);
  // Función para cargar componentes dinámicamente
  const DynamicComponent = (name: string) =>
    dynamic<{ data: Component }>(() =>
      import(`@/components/shared/Component/${name}`).catch(
        () => import('@/components/shared/Component/Default')
      )
    );

  return (
    <>
      {currentPage.components &&
        currentPage.components.map((component, index) => {
          const componentName = component.typeComponentValue
            ? componentMap[component.typeComponentValue]
            : null;
          console.log('component', component);
          console.log(
            'component.typeComponentValue',
            component.typeComponentValue
          );
          console.log('componentName', componentName);

          if (componentName === null) {
            console.error('componentName null');
            return <div key={index}>COMPONENTE NO ENCONTRADO</div>;
          }
          const DComponent = DynamicComponent(componentName);
          return component ? (
            <DComponent key={index} data={component as Component} />
          ) : (
            <div>CANT LOAD COMPONENT</div>
          );
        })}
    </>
  );
}
