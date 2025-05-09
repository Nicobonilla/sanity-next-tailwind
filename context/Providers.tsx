'use client';

import {
  SanityContextProvider,
  type SanityContextType,
} from '@/context/SanityContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { ContactDrawerProvider } from './ContactDrawerContext';
import { DrawerNavProvider } from './DrawerNavContext';

interface ProvidersProps {
  children: React.ReactNode;
  initialData: SanityContextType;
  withDarkMode: boolean;
}

export default function Providers({
  children,
  initialData,
  withDarkMode,
}: ProvidersProps) {
  return (
    <SanityContextProvider initialData={initialData}>
      <ThemeProvider withDarkMode={withDarkMode}>
        <LoadingProvider>
          <ContactDrawerProvider>
            <DrawerNavProvider>{children}</DrawerNavProvider>
          </ContactDrawerProvider>
        </LoadingProvider>
      </ThemeProvider>
    </SanityContextProvider>
  );
}
