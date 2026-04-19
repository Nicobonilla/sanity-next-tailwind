'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { trackContactDrawerOpen } from '@/components/lib/GTMTrackers';

interface ContactDrawerContextType {
  isOpen: boolean;
  openDrawer: (source?: string) => void;
  closeDrawer: () => void;
  toggleDrawerForm: () => void;
}

const ContactDrawerContext = createContext<
  ContactDrawerContextType | undefined
>(undefined);

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback((source = 'contact_drawer_button') => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    trackContactDrawerOpen(source);
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

export function useContactDrawerContext() {
  const context = useContext(ContactDrawerContext);
  if (context === undefined) {
    throw new Error(
      'useContactDrawerContext must be used within a ContactDrawerProvider'
    );
  }
  return context;
}
