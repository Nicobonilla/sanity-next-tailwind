'use client';

import { useState } from 'react';
import { Links } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSanityContext } from '@/context/SanityContext';
import { useScrollContext } from '@/context/ScrollContext';
import clsx from 'clsx';

export default function SubsectionsOneColumn() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const path = usePathname();
  const { pagesLink } = useSanityContext();
  const { scrolling } = useScrollContext();

  const handleMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };
  // Agrupar servicios por unidad de negocio
  const groupedServices = pagesLink.reduce(
    (acc, service) => {
      if (service?.subsections) {
        service.subsections.forEach((subsection) => {
          if (subsection?.unitBusiness) {
            const { title } = subsection.unitBusiness; // Asumiendo que unitBusiness tiene un título
            if (title) {
              if (!acc[title]) {
                acc[title] = [];
              }
              acc[title].push(subsection); // Agrupamos las subsecciones bajo su unidad de negocio
            }
          }
        });
      }
      return acc;
    },
    {} as Record<string, Links[]>
  );

  return (
    <nav className="hidden lg:block">
      {/* MAIN NAV*/}
      <ul className="flex h-full items-center justify-center">
        {pagesLink?.map((link) => (
          <li
            key={link?.title}
            className="group relative my-auto flex h-full cursor-pointer items-center justify-center px-0 2xl:px-6"
            onMouseEnter={() => handleMouseEnter(link?.title || '')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={{ pathname: `/${link?.slug}` }} passHref>
              <span
                className={clsx(
                  'nav inline-flex items-center justify-center uppercase drop-shadow-xl',
                  scrolling ? 'text-gray-600' : 'text-gray-500'
                )}
              >
                {link?.title}
              </span>
              <div className="absolute w-0 border-b-2 border-gray-200 transition-all duration-300 ease-in-out group-hover:w-4/5 group-hover:xl:w-[70%] group-hover:2xl:w-3/5"></div>
            </Link>
          </li>
        ))}
      </ul>
      {/* SUBSECTIONS */}
      {pagesLink?.map(
        (link) =>
          link?.subsections &&
          link.subsections?.length > 0 &&
          activeLink === link.title && (
            <div
              key={link.title}
              className="nav-bg-subsection absolute right-56 z-50 h-fit w-fit pb-10"
              onMouseEnter={() => handleMouseEnter(link.title || '')}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="mx-auto mt-1 flex w-[350px] flex-col">
                {groupedServices &&
                  Object.keys(groupedServices).map((businessName) => {
                    const servicesForBusiness = groupedServices[businessName];
                    const business = servicesForBusiness[0]?.unitBusiness; // Obtener información de negocio del primer servicio
                    return (
                      <li key={businessName} className="group relative">
                        {' '}
                        {/* Added relative positioning */}
                        <div className="nav-subsection-desk flex flex-row items-center text-center text-sm font-light uppercase">
                          <span className="w-full border-b-2 border-gray-200 py-2 text-center">
                            {business?.title}
                          </span>
                          <ul className="absolute left-full top-0 hidden min-w-[200px] bg-black group-hover:block">
                            {servicesForBusiness.map((service) => (
                              <li key={service?.slug} className="py-2">
                                <Link
                                  href={{
                                    pathname:
                                      path.split('/')[1] == link.slug
                                        ? service?.slug
                                        : `${link?.slug}/${service?.slug}`,
                                  }}
                                  className="nav-subsection-desk block text-white hover:text-red-400"
                                >
                                  {service?.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )
      )}
    </nav>
  );
}
