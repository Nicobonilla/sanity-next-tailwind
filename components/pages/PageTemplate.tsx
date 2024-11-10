'use client';
import dynamic from 'next/dynamic';
import { Component } from '@/sanity/fetchs/pagesFetch'; // Ensure this is the correct type
import { useAppContext } from '@/context/AppContext';

// Componente de página
export default function PageTemplate({
  components,
}: {
  components?: Component[];
}) {
  // Dynamically load the component based on its name
  const { componentsMap } = useAppContext();

  const DynamicComponent = (name: string) =>
    dynamic<{ data: Component }>(() =>
      import(`@/components/shared/Component/${name}`).catch(
        () => import('@/components/shared/Component/Default')
      )
    );

  // If there are no components, show a message
  if (!components) {
    return <div>No components available</div>;
  }

  return (
    <>
      {components.map((component: Component, index: number) => {
        if (!component) {
          return <div key={index}>NO COMPONENT</div>;
        }

        // Get the component name from the typeComponentValue
        const componentName = component.typeComponentValue
          ? componentsMap[component.typeComponentValue]
          : null;

        if (!componentName) {
          console.error('componentName is null or undefined');
          return <div key={index}>COMPONENTE NO ENCONTRADO</div>;
        }

        // Dynamically load the component
        const DComponent = DynamicComponent(componentName);

        // Render the dynamic component or an error message
        return <DComponent key={index} data={component} />;
      })}
    </>
  );
}
