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
  const content = (
    <ContactDrawerProvider>
      <DrawerNavProvider>{children}</DrawerNavProvider>
    </ContactDrawerProvider>
  );

  if (!withDarkMode) {
    return content;
  }

  return (
    <ThemeProvider withDarkMode={withDarkMode}>
      {content}
    </ThemeProvider>
  );
}
