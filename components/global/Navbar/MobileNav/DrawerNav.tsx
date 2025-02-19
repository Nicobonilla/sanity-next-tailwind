'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/global/Logo';
import { usePathname } from 'next/navigation';
import { useSanityContext } from '@/context/SanityContext';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import clsx from 'clsx';

export default function DrawerNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const { pages, unitBusinessList } = useSanityContext();

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.mobile-nav-drawer')) {
        setIsMenuOpen(false);
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
        <button
          onClick={toggleMenu}
          className="mr-4 flex items-center justify-center text-black"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <IoIosClose size={30} /> : <IoIosMenu size={30} />}
        </button>
        <div
          className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`fixed right-0 top-0 z-50 h-screen bg-neutral-950 shadow-lg transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'w-4/5 translate-x-0 sm:w-3/4' : 'w-0 translate-x-full'
          }`}
        >
          <nav className="max-h-screen overflow-y-auto p-6">
            <div className="z-20 mx-auto mb-10 flex h-24 items-center justify-center text-white">
              {isMenuOpen && <Logo />}
            </div>
            <ul className="min-w-[250px] items-center uppercase text-white">
              {pages.map((page) =>
                page.slug === 'services' ? (
                  // For services, map through business units
                  unitBusinessList?.map((business) => (
                    <li
                      key={business.slug}
                      className="nav h-8 hover:bg-gray-900"
                    >
                      <Link
                        href={`/area-de-practica/${business.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={clsx(
                          'block px-4 font-bitter text-base font-medium transition-all duration-300 hover:text-lg hover:text-red-500',
                          path === `/area-de-practica/${business.slug}` &&
                            'bg-gray-900 text-lg text-red-500'
                        )}
                      >
                        {business.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  // For other pages, just show the page title once
                  <li
                    key={page.slug}
                    className="nav h-8 transition-all hover:bg-gray-900"
                  >
                    <Link
                      href={`/${page.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={clsx(
                        'block px-4 font-bitter text-base font-medium transition-all hover:text-lg hover:text-red-500',
                        path === `/${page.slug}` &&
                          'bg-gray-900 text-lg text-red-500'
                      )}
                    >
                      {page.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
