'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useState, useMemo } from 'react';
import { useLoadingContext } from '@/context/LoadingContext';
import { Spinner } from '@/components/global/Spinner';
import {
  ComponentProps,
  ComponentsProps,
  LoadedComponent,
} from '@/components/types';

// Move dynamic imports outside component
const getDynamicComponent = (componentType: string) =>
  dynamic<{ data: ComponentProps }>(
    () =>
      import(`./component/${componentType || 'Default'}`).catch(
        () => import('./component/Default')
      ),
    { ssr: false, loading: () => <Spinner /> }
  );

const MemoizedComponent = memo(
  ({ Component, dataComponents }: LoadedComponent) => (
    <Component data={dataComponents} />
  )
);

MemoizedComponent.displayName = 'MemoizedComponent';

export default function PageTemplate({
  components,
}: {
  components?: ComponentsProps;
}) {
  const { isLoading, setLoading, setComponents } = useLoadingContext();

  const loadedComponents = useMemo(
    () =>
      components?.map((component: ComponentProps) => ({
        dataComponents: component,
        Component: getDynamicComponent(component.typeComponentValue),
      })) || [],
    [components]
  );

  useEffect(() => {
    if (components) {
      setComponents(components);
      setLoading(false);
    }
  }, [components, setComponents, setLoading]);

  if (isLoading) return <Spinner />;
  return (
    <div className="opacity-100 transition-opacity duration-300">
      {loadedComponents.map((props: LoadedComponent, index: number) => (
        <MemoizedComponent key={`component-${index}`} {...props} />
      ))}
    </div>
  );
}

export const revalidate = 10000;
