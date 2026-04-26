'use client';

import { useState, useEffect, useRef } from 'react';
import {
  GetPostDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';
import { TocHeader } from './TocHeader';
import { TocList } from './TocList';

export type TableOfComponentsProps =
  | NonNullable<GetPostDetailQueryResult>['tableOfContents']
  | NonNullable<GetServiceDetailQueryResult>['tableOfContents'];

export const TableOfContents = ({
  items,
}: {
  items: TableOfComponentsProps;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Tabla de contenido"
      className="mb-5 w-full overflow-hidden rounded-2xl border border-[color:rgba(31,39,51,0.10)] bg-[color:rgba(255,255,255,0.92)] shadow-sm md:sticky md:top-24 md:z-40"
    >
      <TocHeader isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
      <TocList
        items={items}
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
      />
    </nav>
  );
};
