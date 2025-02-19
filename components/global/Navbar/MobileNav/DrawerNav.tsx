'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSanityContext } from '@/context/SanityContext';
import { useContactDrawer } from '@/context/ContactDrawerContext';
import MenuButton from './MenuButton';
import Overlay from './Overlay';
import DrawerContent from './DrawerContent';

export default function DrawerNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const { pages, unitBusinessList } = useSanityContext();
  const { toggleDrawerForm } = useContactDrawer();

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const closeMenuOnClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.mobile-nav-drawer')) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      window.addEventListener('click', closeMenuOnClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('click', closeMenuOnClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="right-0 z-50 flex h-full grow-0 lg:hidden">
      <div className="relative flex h-full cursor-pointer">
        <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
        <DrawerContent
          isMenuOpen={isMenuOpen}
          pages={pages}
          unitBusinessList={unitBusinessList}
          path={path}
          toggleDrawerForm={toggleDrawerForm}
          closeMenu={closeMenu}
        />
      </div>
    </div>
  );
}
