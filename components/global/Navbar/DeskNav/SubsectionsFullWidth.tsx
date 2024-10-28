'use client';

import { useState } from 'react';
import { Links, NavProps } from '@/types';
import Link from 'next/link';
import Icon from '@/components/shared/Icon';

export default function SubsectionsFullWidth({ links }: NavProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const handleMouseEnter = (title: string) => {
    setActiveLink(title);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };
  // Agrupar servicios por unidad de negocio
  const groupedServices = links.reduce(
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
      <ul className="flex h-24 items-center">
        {links?.map((link) => (
          <li
            key={link.title}
            className="group relative flex h-24 cursor-pointer items-center px-4 2xl:px-8"
            onMouseEnter={() => handleMouseEnter(link.title || '')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={{ pathname: link.slug }} passHref>
              <span className="nav inline-flex items-center justify-center">
                {link.title}
              </span>
              <div className="absolute w-0 border-b-2 border-red-700 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-[70%] group-hover:xl:w-2/5"></div>
            </Link>
          </li>
        ))}
      </ul>

      {links?.map(
        (link) =>
          link.subsections &&
          link.subsections?.length > 0 &&
          activeLink === link.title && (
            <div
              key={link.title}
              className="nav-bg-subsection absolute left-0 z-50 h-56 w-screen"
              onMouseEnter={() => handleMouseEnter(link.title || '')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-screen-xl p-6">
                <div className={`flex flex-row gap-8`}>
                  {groupedServices &&
                    Object.keys(groupedServices).map((businessName) => {
                      console.log(link.slug);
                      const mainSlug = link.slug || '';
                      const servicesForBusiness = groupedServices[businessName];
                      const business = servicesForBusiness[0].unitBusiness; // Obtener información de negocio del primer servicio
                      return (
                        <div
                          key={businessName}
                          className="flex h-20 w-full flex-col"
                        >
                          {business && (
                            <div className="nav-unit-business mb-2 flex items-center space-x-4">
                              {business.icon && (
                                <Icon name={business.icon} className="size-6" />
                              )}
                              <span>{business.title}</span>
                              <div className="flex-grow border-b border-gray-300 dark:border-gray-600" />
                            </div>
                          )}
                          <ul className="mt-2 flex flex-col">
                            {servicesForBusiness.map(({ title, slug }) => (
                              <li key={title}>
                                <Link
                                  href={{ pathname: mainSlug + '/' + slug }}
                                  passHref
                                  className="nav-subsection block"
                                >
                                  {title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )
      )}
    </nav>
  );
}
