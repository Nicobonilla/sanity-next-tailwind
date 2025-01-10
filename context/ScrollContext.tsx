'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

// Define the expected structure of the context data
type ScrollContextType = {
  scrolling: boolean;
};

// Create context with a default value (it can be undefined or an empty object)
export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);

// Create context provider
export const ScrollContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pass an object with `scrolling` to match the expected type
  return (
    <ScrollContext.Provider value={{ scrolling }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Create a custom hook to use context
export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error(
      'useScrollContext must be used within a ScrollContextProvider'
    );
  }
  return context;
};
