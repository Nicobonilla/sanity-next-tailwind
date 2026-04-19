import Link from 'next/link';

import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site-config';

type LogoProps = {
  logo?: string | null;
  slogan?: string | null;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
};

export default function Logo({
  logo,
  slogan,
  align = 'left',
  invert = false,
  className,
}: LogoProps) {
  const title = logo || siteConfig.shortName;
  const subtitle = slogan || siteConfig.descriptor;

  return (
    <Link
      aria-label={`Ir al inicio de ${title}`}
      className={cn(
        'inline-flex',
        align === 'center' ? 'justify-center' : 'justify-start',
        className
      )}
      href="/"
    >
      <div
        className={cn(
          'flex max-w-[280px] flex-col gap-1',
          align === 'center' ? 'items-center text-center' : 'items-start text-left'
        )}
      >
        <span
          className={cn(
            'font-display text-[1.8rem] font-semibold leading-none tracking-[0.02em] lg:text-[2rem]',
            invert ? 'text-[color:var(--color-bg)]' : 'text-[color:var(--color-primary)]'
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'font-body text-[0.72rem] uppercase tracking-[0.24em] lg:text-xs',
            invert
              ? 'text-[color:rgba(245,242,236,0.76)]'
              : 'text-[color:var(--color-text-soft)]'
          )}
        >
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
