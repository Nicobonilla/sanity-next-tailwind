'use client';

import { useState } from 'react';
import { Menu as Menu2, X, User } from 'lucide-react';
import { NavProps } from '@/types';
import Link from 'next/link';

export default function SubsectionsFullWidth({ links }: NavProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const handleMouseEnter = (section: string) => {
    setActiveLink(section);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <nav className="static hidden font-sans lg:block">
      <ul className="dark:font-crimson flex h-24 items-center justify-between space-x-2 font-montserrat font-thin text-white xl:space-x-16 2xl:space-x-28">
        {links?.map((link) => (
          <li
            key={link.section}
            className="group relative"
            onMouseEnter={() => handleMouseEnter(link.section)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={link.href} passHref>
              <span className="inline-flex h-24 items-center justify-center px-4 font-mono text-base text-gray-200 hover:font-bold dark:font-light dark:text-white">
                {link.section}
              </span>
            </Link>
          </li>
        ))}

        <li
          key={'contacto'}
          className="group relative"
          onMouseEnter={() => handleMouseEnter('contacto')}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={{ pathname: '/login' }} passHref>
            <span className="inline-flex h-full items-center justify-center text-gray-200">
              <User className="hover:fill-gray-200" />
            </span>
          </Link>
        </li>

        <li
          key={'contacto'}
          className="group relative"
          onMouseEnter={() => handleMouseEnter('contacto')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hidden items-center md:flex md:flex-col">
            <Link href={{ pathname: '/fono' }} passHref>
              <span className="font-crimson text-xl font-bold dark:text-white">
                +56 9 8155 9390
              </span>
            </Link>

            <Link href={{ pathname: '/agendar' }} passHref>
              <button className="mt-1 rounded bg-second-500 px-4 py-2 text-white hover:font-bold">
                AGENDAR AHORA
              </button>
            </Link>
          </div>
        </li>
      </ul>

      {/* Subsections */}
      {links?.map(
        (link) =>
          link.subsections &&
          link.subsections?.length > 0 &&
          activeLink === link.section && (
            <div
              key={link.section}
              className="absolute left-0 z-50 w-screen bg-white shadow-lg transition-opacity duration-1000 ease-in-out"
              onMouseEnter={() => handleMouseEnter(link.section)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container mx-auto max-w-screen-lg p-6">
                <div className="grid grid-cols-4">
                  <div className="col-span-2 mb-4 flex items-center space-x-4">
                    <Menu2 className="size-6 text-gray-600" />
                    <span className="font-semibold text-gray-800">
                      {link.section}
                    </span>
                  </div>
                  <div className="col-span-2 mb-4 flex items-center space-x-4">
                    <User className="size-6 text-gray-600" />
                    <span className="font-semibold text-gray-800">
                      User Section
                    </span>
                  </div>
                  {/* Subsections */}
                  {link.subsections.map(({ section, href }) => (
                    <Link
                      key={section}
                      href={href}
                      passHref
                      className="rounded pr-4 font-montserrat text-sm font-light text-black transition-all duration-300 hover:bg-[#6f97d9] hover:text-white"
                    >
                      {section}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
      )}
    </nav>
  );
}
