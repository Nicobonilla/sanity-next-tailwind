'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  GetPageDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  setDataPage: (
    data: GetPageDetailQueryResult | GetServiceDetailQueryResult | null
  ) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataPage, setDataPage] = useState<
    GetPageDetailQueryResult | GetServiceDetailQueryResult | null
  >(null);

  useEffect(() => {
    if (dataPage) {
      // Agregamos un pequeño delay para asegurar que los componentes dinámicos se carguen
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [dataPage]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading: setIsLoading,
        setDataPage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  }
  return context;
};
