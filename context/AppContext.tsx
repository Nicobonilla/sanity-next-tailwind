'use client';
import { Links } from '@/types';
import { createContext, useContext, ReactNode } from 'react';

// Define the expected structure of the context data
export type AppContextType = {
  componentsMap: Record<string, string | null>;
  pagesLink: Links[]; // Ensure this type matches with your expected structure
};

// Create context with a default value (it can be undefined or an empty object)
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create context provider
export const AppContextProvider = ({
  initialData,
  children,
}: {
  initialData: AppContextType;
  children: ReactNode;
}) => {
  return (
    <AppContext.Provider value={initialData}>{children}</AppContext.Provider>
  );
};

// Create a custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
