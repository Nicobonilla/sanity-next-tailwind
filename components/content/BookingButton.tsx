'use client';

import { ReactNode } from 'react';

import ContactDrawerButton from '@/components/global/ContactDrawerButton';
import {
  trackBookingClick,
} from '@/components/lib/GTMTrackers';
import { Button } from '@/components/ui/Button';
import { SiteIdentity } from '@/lib/site-identity';

export default function BookingButton({
  children,
  className,
  siteIdentity,
  source,
  variant = 'primary',
}: {
  children?: ReactNode;
  className?: string;
  siteIdentity: SiteIdentity;
  source: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const label =
    typeof children !== 'undefined'
      ? children
      : siteIdentity.booking.buttonLabel || 'Solicitar hora virtual';

  if (siteIdentity.booking.isEnabled && siteIdentity.booking.bookingUrl) {
    return (
      <Button asChild className={className} variant={variant}>
        <a
          href={siteIdentity.booking.bookingUrl}
          onClick={() => trackBookingClick(source, 'external')}
          rel="noreferrer"
          target="_blank"
        >
          {label}
        </a>
      </Button>
    );
  }

  return (
    <ContactDrawerButton
      className={className}
      onOpen={() => trackBookingClick(source, 'request')}
      source={source}
      variant={variant}
    >
      {label}
    </ContactDrawerButton>
  );
}
