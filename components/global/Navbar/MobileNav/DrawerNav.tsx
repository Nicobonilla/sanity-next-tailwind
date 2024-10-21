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

  const toggleSection = (section: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Detener la propagación del clic para evitar el cierre del drawer
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
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
      <div className="relative z-50 flex h-full cursor-pointer text-white">
        <div
          onClick={toggleMenu}
          className="mr-4 flex items-center justify-center"
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
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={closeMenu} // Close menu on overlay click
          ></div>

          {/* Mobile Menu Drawer */}
          <div
            id="mobile-menu"
            className={`mobile-nav-drawer fixed right-0 top-0 z-50 h-screen transform overflow-y-auto bg-drawerColor shadow-lg transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } w-[70%] sm:w-[60%] md:w-[40%]`}
          >
            <nav className="scale-y-80 p-6">
              <div className="z-20 mx-auto mb-10 flex h-24 grow-0 justify-start">
                <Logo />
              </div>
              <ul className="items-center divide-y divide-dividerDrawer">
                {links.map((link) => (
                  <li key={link.section}>
                    <button
                      onClick={(e) => toggleSection(link.section, e)} // Add event here
                      className="flex w-full items-center justify-between py-3 text-gray-300 hover:text-white focus:outline-none"
                    >
                      {link.section}
                      {link.subsections &&
                        link.subsections.length > 0 &&
                        (expandedSections.includes(link.section) ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        ))}
                    </button>
                    {expandedSections.includes(link.section) && (
                      <ul className="space-y-2 pl-4">
                        {link.subsections &&
                          link.subsections.map((sublink) => (
                            <li key={sublink.section}>
                              <Link href={sublink.href} onClick={closeMenu}>
                                <span className="block font-thin text-gray-300 hover:font-normal hover:text-white">
                                  {sublink.section}
                                </span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
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
