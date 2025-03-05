'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useMemo } from 'react';
import { useLoadingContext } from '@/context/LoadingContext';
import getComponentSkeleton from '@/components/pages/skeletons/utils/getComponentSkeleton';
import { Spinner } from '@/components/global/Spinner';
import { ComponentProps, ComponentsProps } from '@/components/types';

// Types
interface LoadedComponent {
  Component: React.ComponentType<{ data: ComponentProps }>;
  data: ComponentProps;
}

// Functions
const getDynamicComponent = (type: string, variant?: string) =>
  dynamic<{ data: ComponentProps }>(
    () =>
      import(`@/components/pages/component/${type}`).catch(
        () => import('@/components/pages/component/Default')
      ),
    {
      ssr: false,
      loading: () => {
        const Skeleton = getComponentSkeleton(type, variant);
        return <Skeleton />;
      },
    }
  );

// Memoized Component
const MemoizedComponent = memo(({ Component, data }: LoadedComponent) => (
  <Component data={data} />
));
MemoizedComponent.displayName = 'MemoizedComponent';

// Main Component
const PageTemplate = ({ components }: { components?: ComponentsProps }) => {
  const { isLoading, setLoading, setComponents } = useLoadingContext();

  // Effect to handle loading state and components
  useEffect(() => {
    if (components) {
      setComponents(components);
      setLoading(false);
    }
  }, [components, setComponents, setLoading]);

  // Memoized loaded components
  const loadedComponents = useMemo(
    () =>
      components?.map((component: ComponentProps) => ({
        data: component,
        Component: getDynamicComponent(
          component.typeComponentValue,
          component.variant
        ),
      })) || [],
    [components]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Main render
  return (
    <div className="opacity-100 transition-opacity duration-300">
      {loadedComponents.map((props: LoadedComponent, index: number) => (
        <MemoizedComponent
          key={`component-${index}-${props.data.typeComponentValue}`}
          {...props}
        />
      ))}
    </div>
  );
};

export default PageTemplate;