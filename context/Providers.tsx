'use client';

import {
  SanityContextProvider,
  type SanityContextType,
} from '@/context/SanityContext';
import { ContactDrawerProvider } from './ContactDrawerContext';
import { DrawerNavProvider } from './DrawerNavContext';

interface ProvidersProps {
  children: React.ReactNode;
  initialData: SanityContextType;
}

export default function Providers({
  children,
  initialData,
}: ProvidersProps) {
  return (
    <SanityContextProvider initialData={initialData}>
      <ContactDrawerProvider>
        <DrawerNavProvider>{children}</DrawerNavProvider>
      </ContactDrawerProvider>
    </SanityContextProvider>
  );
}
