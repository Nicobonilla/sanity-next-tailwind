'use client';
/*
import { useState } from 'react';
import { Links } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSanityContext } from '@/context/SanityContext';
import { useScrollContext } from '@/context/ScrollContext';
import clsx from 'clsx';
import { GetUnitBusinessListQueryResult } from '@/sanity.types';

 export default function SubsectionsFitWidth() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const path = usePathname();
  const { pages, unitBusinessList } = useSanityContext();
  const { scrolling } = useScrollContext();
  return null}
  const handleMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };
  // Agrupar servicios por unidad de negocio
  return (
    <nav className="hidden lg:block">
      <ul className="flex h-full items-center justify-center">
        {pages?.map((link) => (
          <li
            key={link?.title}
            className="group relative my-auto flex h-full cursor-pointer items-center justify-center px-4 2xl:px-8"
            onMouseEnter={() => handleMouseEnter(link?.title || '')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={{ pathname: `/${link?.slug}` }} passHref>
              <span
                className={clsx(
                  'nav inline-flex items-center justify-center uppercase drop-shadow-xl',
                  scrolling ? 'text-gray-800' : 'text-white'
                )}
              >
                {link?.title}
              </span>
              <div className="absolute w-0 border-b-2 border-gray-200 transition-all duration-300 ease-in-out group-hover:w-4/5 group-hover:xl:w-[70%] group-hover:2xl:w-3/5"></div>
            </Link>
          </li>
        ))}
      </ul>

      {false &&
        unitBusinessList?.map(
          (business) =>
            activeLink === business.title && (
              <div
                key={business.title}
                className="nav-bg-subsection absolute right-0 z-50 h-56 px-10 pb-5 lg:w-fit"
                onMouseEnter={() => handleMouseEnter(business.title || '')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-auto w-fit max-w-screen-lg p-2">
                  <div className={`flex flex-row gap-8`}>
                    <ul className="mt-1 flex flex-row gap-4">
                      {business?.services?.map((services) => {
                        return (
                          <>
                            {business && (
                              
                                {services?.map(
                                  (
                                    service: GetUnitBusinessListQueryResult[number]['services'],
                                    index: number
                                  ) => (
                                    <li key={service?.slug}>
                                      <Link
                                        href={{
                                          pathname:
                                            path.split('/')[1] == link.slug
                                              ? service?.slug
                                              : `${link?.slug}/${service?.slug}`,
                                        }}
                                        passHref
                                        className="nav-subsection-desk block"
                                      >
                                        {service?.title}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )
        )}
    </nav>
  );
}
*/
