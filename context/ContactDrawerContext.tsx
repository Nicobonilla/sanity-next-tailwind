'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface ContactDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawerForm: () => void;
}

const ContactDrawerContext = createContext<
  ContactDrawerContextType | undefined
>(undefined);

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleDrawerForm = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);

  return (
    <ContactDrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        toggleDrawerForm,
      }}
    >
      {children}
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext);
  if (context === undefined) {
    throw new Error(
      'useContactDrawer must be used within a ContactDrawerProvider'
    );
  }
  return context;
}
