'use client';
import { Links } from '@/types';
import { createContext, useContext, ReactNode } from 'react';

// Define the expected structure of the context data
export type SanityContextType = {
  componentsMap: Record<string, string | null>[]; 
  pagesLink: Links[]; // Ensure this type matches with your expected structure
};

// Create context with a default value (it can be undefined or an empty object)
export const SanityContext = createContext<SanityContextType | undefined>(
  undefined
);

// Create context provider
export const SanityContextProvider = ({
  initialData,
  children,
}: {
  initialData: SanityContextType;
  children: ReactNode;
}) => {
  if (!initialData) {
    throw new Error('SanityContextProvider requires initialData');
  }
  return (
    <SanityContext.Provider value={initialData}>
      {children}
    </SanityContext.Provider>
  );
};

// Create a custom hook to use context
export const useSanityContext = () => {
  const context = useContext(SanityContext);
  if (!context) {
    throw new Error(
      'useSanityContext must be used within an SanityContextProvider'
    );
  }
  return context;
};
