'use client';

import { useState } from 'react';
import { Links } from '@/types';
import Link from 'next/link';
import Icon from '@/components/shared/Icon';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useScrollContext } from '@/context/ScrollContext';

export default function SubsectionsFullWidth() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const path = usePathname();
  const { pagesLink } = useAppContext();
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
      <ul className="flex h-full items-center justify-center">
        {pagesLink?.map((link) => (
          <li
            key={link?.title}
            className="group relative my-auto flex h-full cursor-pointer items-center justify-center px-4 2xl:px-8"
            onMouseEnter={() => handleMouseEnter(link?.title || '')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={{ pathname: `/${link?.slug}` }} passHref>
              <span
                className={`nav ${scrolling ? 'text-gray-600' : 'text-white'} inline-flex items-center justify-center uppercase`}
              >
                {link?.title}
              </span>
              <div className="absolute w-0 border-b-2 border-gray-200 transition-all duration-300 ease-in-out group-hover:w-4/5 group-hover:xl:w-[70%] group-hover:2xl:w-3/5"></div>
            </Link>
          </li>
        ))}
      </ul>

      {pagesLink?.map(
        (link) =>
          link?.subsections &&
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
                      console.log('link.slug: ', link.slug);
                      const servicesForBusiness = groupedServices[businessName];
                      const business = servicesForBusiness[0]?.unitBusiness; // Obtener información de negocio del primer servicio
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
                              <div className="flex grow border-b border-gray-300 dark:border-gray-600" />
                            </div>
                          )}
                          <ul className="mt-2 flex flex-col">
                            {servicesForBusiness.map((service, index) => (
                              <li key={service?.slug}>
                                <Link
                                  href={{
                                    pathname:
                                      path.split('/')[1] == link.slug
                                        ? service?.slug
                                        : `${link?.slug}/${service?.slug}`,
                                  }}
                                  passHref
                                  className="nav-subsection block"
                                >
                                  {service?.title}
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
