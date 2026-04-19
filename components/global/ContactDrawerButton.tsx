'use client';

import { ReactNode } from 'react';

import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import { Button } from '@/components/ui/Button';

export default function ContactDrawerButton({
  children,
  className,
  onOpen,
  source = 'contact_drawer_button',
  variant = 'primary',
}: {
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
  source?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const { openDrawer } = useContactDrawerContext();

  return (
    <Button
      className={className}
      onClick={() => {
        onOpen?.();
        openDrawer(source);
      }}
      variant={variant}
    >
      {children}
    </Button>
  );
}
