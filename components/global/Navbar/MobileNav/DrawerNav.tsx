'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import MenuButton from './MenuButton';
import Overlay from './Overlay';
import { useDrawerNavContext } from '@/context/DrawerNavContext';
import DrawerContent from './DrawerContent';
import clsx from 'clsx';
import {
  GetPagesNavQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';

export default function DrawerNav({
  pages,
  unitBusinessList,
  logo,
  slogan,
}: {
  pages: GetPagesNavQueryResult;
  unitBusinessList: GetUnitBusinessListQueryResult;
  logo?: string | null;
  slogan?: string | null;
}) {
  const path = usePathname();
  const { isOpen, closeDrawer, toggleDrawerNav } = useDrawerNavContext();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking inside drawer or on menu button
      if (
        drawerRef.current?.contains(e.target as Node) ||
        (e.target as HTMLElement).closest('.menu-button')
      ) {
        return;
      }
      closeDrawer();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDrawer]);

  return (
    <div className="right-0 z-50 flex h-full grow-0 lg:hidden">
      <div className={clsx('relative flex h-full')}>
        <MenuButton isMenuOpen={isOpen} toggleMenu={toggleDrawerNav} />
        <Overlay isMenuOpen={isOpen} />
        <div ref={drawerRef}>
          <DrawerContent
            isMenuOpen={isOpen}
            pages={pages}
            unitBusinessList={unitBusinessList}
            path={path}
            closeMenu={closeDrawer}
            logo={logo}
            slogan={slogan}
          />
        </div>
      </div>
    </div>
  );
}
