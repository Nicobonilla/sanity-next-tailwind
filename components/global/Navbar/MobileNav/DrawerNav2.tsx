'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/global/Logo';
import { usePathname } from 'next/navigation';
import { useSanityContext } from '@/context/SanityContext';
import { useScrollContext } from '@/context/ScrollContext';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import { RiArrowDownSLine } from 'react-icons/ri';

export default function MobileNavDrawer2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Change from array to single string to track only one open section
  const [expandedSection, setExpandedSection] = useState<string>('');
  const path = usePathname();
  const { pages, unitBusinessList } = useSanityContext();
  const { scrolling } = useScrollContext();

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSection = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // If clicking the same section, close it. If clicking a different section, open it
    setExpandedSection((prev) => (prev === title ? '' : title));
  };

  useEffect(() => {
    const closeMenuOnClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.mobile-nav-drawer')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener('click', closeMenuOnClickOutside);
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = ''; // Re-enable scroll
    }

    return () => {
      window.removeEventListener('click', closeMenuOnClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="right-0 flex h-full grow-0 lg:hidden">
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
          className={`fixed right-0 top-0 z-50 h-screen items-center justify-center bg-neutral-950 shadow-lg transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? 'w-full  translate-x-0 sm:w-3/4'
              : 'w-0 translate-x-full'
          }`}
        >
          <nav className="p-6">
            {isMenuOpen && (
              <div className="z-20 mx-auto mb-10 flex h-24 scale-125 items-center justify-center text-white">
                <Logo />
              </div>
            )}
            <ul className="min-w-[300px] items-center uppercase">
              {pages.map((page) => (
                <li key={page.slug} className="">
                  {page.slug === 'services' ? (
                    unitBusinessList?.map((business) => (
                      <div key={business.slug}>
                        <div className="nav">
                          <Link
                            href={`/area-de-practica/${business.slug}`}
                            className="nav text-gray-300"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {business.title}
                          </Link>
                          <button
                            onClick={(e) =>
                              toggleSection(business?.title || '', e)
                            }
                            className="text-gray-200"
                          >
                            <RiArrowDownSLine
                              className={`transform transition-transform duration-500 ${
                                expandedSection === business.title
                                  ? 'rotate-180'
                                  : ''
                              }`}
                            />
                          </button>
                        </div>

                        {expandedSection === business.title && (
                          <ul className="pl-4 py-1">
                            {business.services?.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={{
                                    pathname: `/services/${service.slug}`,
                                  }}
                                  className="nav block text-sm text-gray-200"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <Link
                      href={`/${page.slug}`}
                      className="nav"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {page.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
