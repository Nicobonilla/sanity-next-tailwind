'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X as CloseIcon,
  Menu as MenuIcon,
  ChevronDown,
  ChevronUp,
  PhoneIcon,
  User,
} from 'lucide-react';
import { NavProps } from '@/types';
import Logo from '@/components/shared/Logo';

const MobileNavDrawer: React.FC<NavProps> = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSection = (title: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Detener la propagación del clic para evitar el cierre del drawer
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
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
    <div className="right-0 z-50 h-full grow-0 lg:hidden">
      <div className="relative z-50 flex h-full cursor-pointer">
        <div
          onClick={toggleMenu}
          className="mr-4 flex items-center justify-center text-white"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <CloseIcon className="size-8" />
          ) : (
            <MenuIcon className="size-8" />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/70"
            onClick={closeMenu} // Close menu on overlay click
          ></div>

          {/* Mobile Menu Drawer */}
          <div
            id="mobile-menu"
            className={`mobile-nav-drawer fixed right-0 top-0 z-50 h-screen overflow-y-auto bg-bodydark shadow-lg transition-transform duration-300 ease-in-out dark:bg-bodydark ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } w-[70%] sm:w-[60%] md:w-[40%]`}
          >
            <nav className="scale-y-80 p-6">
              <div className="z-20 mx-auto mb-10 flex h-24 grow-0 justify-start">
                <Logo />
              </div>
              <ul className="items-center divide-y divide-gray-700">
                {links.map((link) => {
                  // Verificamos que link.title exista antes de renderizar
                  const mainSlug = link?.slug || '';
                  if (link?.title) {
                    return (
                      <li key={link.title}>
                        <button
                          onClick={(e) =>
                            toggleSection(link.title ? link.title : '', e)
                          } // Añadir evento aquí
                          className="nav flex w-full items-center justify-between py-2 focus:outline-none"
                        >
                          {link.title}
                          {link.subsections &&
                            link.subsections.length > 0 &&
                            (expandedSections.includes(link.title) ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            ))}
                        </button>
                        {expandedSections.includes(link.title) && (
                          <div className="mb-2 -translate-y-1">
                            <ul className="space-y-1 pl-4">
                              {link.subsections &&
                                link.subsections.map((sublink) => (
                                  <li key={sublink?.slug}>
                                    <Link
                                      href={
                                        sublink?.slug
                                          ? {
                                              pathname:
                                                mainSlug + '/' + sublink.slug,
                                            }
                                          : { pathname: '' }
                                      }
                                      onClick={closeMenu}
                                    >
                                      <span className="nav block text-xs">
                                        {sublink?.title}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  }
                  return null; // Devuelve null si link.title no existe para evitar errores
                })}
              </ul>
              <div className="flex flex-col space-y-4 pt-10 text-sm">
                <button className="bg-second flex justify-center rounded px-4 py-2 text-gray-300">
                  <User className="mr-3 size-5" />
                  PORTAL CLIENTES
                </button>
                <button className="flex justify-center rounded bg-white px-4 py-2 text-gray-600">
                  <PhoneIcon className="mr-3 size-5" />
                  LLÁMENOS AHORA
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNavDrawer;
