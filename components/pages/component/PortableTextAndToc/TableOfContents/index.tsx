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
  const [isExpanded, setIsExpanded] = useState(true);
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
      className="sticky top-24 z-40 w-full border-b-2 border-gray-200 bg-gray-100"
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
