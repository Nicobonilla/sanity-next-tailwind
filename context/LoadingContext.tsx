'use client';

import { ComponentsProps } from '@/components/types';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setComponents: (data: ComponentsProps) => void;
  components: ComponentsProps | null;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false); // Change initial state to false
  const [components, setComponents] = useState<ComponentsProps>(null);

  const handleSetComponents = useCallback((data: ComponentsProps) => {
    if (data) {
      // Only trigger loading if we're actually loading new components
      setIsLoading(true);
      console.log('Loading started componente: ', data);
      setComponents(data);
    }
  }, []);

  useEffect(() => {
    if (components) {
      // Add a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setIsLoading(false);
        console.log('Loading completed, time = ', timer);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [components]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading: setIsLoading,
        setComponents: handleSetComponents,
        components,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * Custom hook to access the loading context
 * @throws {Error} If used outside of LoadingProvider
 * @returns {LoadingContextProps} The loading context value
 */
export function useLoadingContext(): LoadingContextProps {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  }

  return context;
}

// Example usage of the loading context
export function usePageLoading() {
  const { isLoading, setLoading, setComponents, components } =
    useLoadingContext();

  const startLoading = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setComponents,
    components,
  };
}
