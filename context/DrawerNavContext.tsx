'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface DrawerNavContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawerNav: () => void;
}

const DrawerNavContext = createContext<DrawerNavContextType | undefined>(
  undefined
);

export function DrawerNavProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleDrawerNav = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);

  return (
    <DrawerNavContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        toggleDrawerNav,
      }}
    >
      {children}
    </DrawerNavContext.Provider>
  );
}

export function useDrawerNavContext() {
  const context = useContext(DrawerNavContext);
  if (context === undefined) {
    throw new Error('useDrawerNav must be used within a DrawerNavProvider');
  }
  return context;
}
