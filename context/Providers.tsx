'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { ContactDrawerProvider } from './ContactDrawerContext';
import { DrawerNavProvider } from './DrawerNavContext';

interface ProvidersProps {
  children: React.ReactNode;
  withDarkMode: boolean;
}

export default function Providers({
  children,
  withDarkMode,
}: ProvidersProps) {
  return (
    <ThemeProvider withDarkMode={withDarkMode}>
      <ContactDrawerProvider>
        <DrawerNavProvider>{children}</DrawerNavProvider>
      </ContactDrawerProvider>
    </ThemeProvider>
  );
}
