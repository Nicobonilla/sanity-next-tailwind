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
      if (service.subsections) {
        service.subsections.forEach((subsection) => {
          if (subsection.unitBusiness) {
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
    <nav className="static hidden font-sans lg:block">
      <ul className="flex h-24 items-center justify-between space-x-2 font-montserrat font-thin text-white xl:space-x-16 2xl:space-x-28 dark:font-crimson">
        {links?.map((link) => (
          <li
            key={link.title}
            className="group relative"
            onMouseEnter={() => handleMouseEnter(link.title || '')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={{ pathname: link.slug }} passHref>
              <span className="inline-flex h-24 items-center justify-center px-4 font-mono text-base text-gray-200 hover:font-bold dark:font-light dark:text-white">
                {link.title}
              </span>
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
              className="absolute left-0 z-50 h-96 w-screen bg-white shadow-lg transition-opacity duration-1000 ease-in-out"
              onMouseEnter={() => handleMouseEnter(link.title || '')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container mx-auto max-w-screen-lg p-6">
                <div className={`flex flex-row gap-4`}>
                  {/* ${groupedServices.length} */}
                  {groupedServices &&
                    Object.keys(groupedServices).map((businessName) => {
                      console.log(businessName);
                      const servicesForBusiness = groupedServices[businessName];
                      const business = servicesForBusiness[0].unitBusiness; // Obtener información de negocio del primer servicio
                      return (
                        <div
                          key={businessName}
                          className="mb-4 flex h-20 w-full flex-col"
                        >
                          {business && (
                            <div className="flex items-center space-x-4">
                              {business.icon && (
                                <Icon
                                  name={business.icon}
                                  className="h-6 w-6 text-gray-600"
                                />
                              )}
                              <span className="font-semibold text-gray-800">
                                {business.title}
                              </span>
                            </div>
                          )}
                          <ul className="mt-2 flex flex-col space-y-1">
                            {servicesForBusiness.map(({ title, slug }) => (
                              <li key={title}>
                                <Link
                                  href={{ pathname: slug }}
                                  passHref
                                  className="block rounded py-1 pr-10 font-montserrat text-sm font-bold text-black transition-all duration-300 hover:bg-[#6f97d9] hover:text-white"
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
