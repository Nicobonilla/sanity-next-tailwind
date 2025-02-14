'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import type {
  GetPageDetailQueryResult,
  GetPostDetailQueryResult,
  GetServiceDetailQueryResult,
  GetUnitBusinessDetailQueryResult,
} from '@/sanity.types';

export type PageData =
  | GetPageDetailQueryResult
  | GetServiceDetailQueryResult
  | GetPostDetailQueryResult
  | GetUnitBusinessDetailQueryResult
  | null;

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setDataPage: (data: PageData) => void;
  dataPage: PageData;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataPage, setDataPage] = useState<PageData>(null);

  // Memoize setDataPage to prevent unnecessary re-renders
  const handleSetDataPage = useCallback((data: PageData) => {
    setDataPage(data);
  }, []);

  useEffect(() => {
    if (dataPage) {
      // Use requestAnimationFrame for smoother transitions
      const frame = requestAnimationFrame(() => {
        setIsLoading(false);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [dataPage]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading: setIsLoading,
        setDataPage: handleSetDataPage,
        dataPage,
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
  const { isLoading, setLoading, setDataPage, dataPage } = useLoadingContext();

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
    setDataPage,
    dataPage,
  };
}
