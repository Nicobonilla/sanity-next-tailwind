'use client';

import { ReactNode } from 'react';

import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import { Button } from '@/components/ui/Button';

export default function ContactDrawerButton({
  children,
  className,
  variant = 'primary',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const { openDrawer } = useContactDrawerContext();

  return (
    <Button className={className} onClick={openDrawer} variant={variant}>
      {children}
    </Button>
  );
}
