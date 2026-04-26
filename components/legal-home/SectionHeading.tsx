import { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-subtitle text-balance">{title}</h2>
      {description ? (
        <div className={cn('section-copy', align === 'center' && 'max-w-3xl')}>
          {description}
        </div>
      ) : null}
    </div>
  );
}
