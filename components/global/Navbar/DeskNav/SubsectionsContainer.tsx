import { Links } from '@/types';
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface SubsectionsContainerProps {
  link: Links;
  groupedServices: Record<string, Links[]>;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
}

const SubsectionsContainer = ({
  link,
  groupedServices,
}: SubsectionsContainerProps) => {
  const [activeLink2, setActiveLink2] = useState<string | null>(null);
  const [activeLink3, setActiveLink3] = useState<string | null>(null);

  const onMouseEnter2 = (slug: string) => {
    setActiveLink2(slug);
  };

  const onMouseLeave2 = () => {
    setActiveLink2(null);
  };

  const onMouseEnter3 = (slug: string) => {
    setActiveLink3(slug);
  };

  const onMouseLeave3 = () => {
    setActiveLink3(null);
  };
  return (
    <div className="absolute inset-0 -left-20 top-full z-50">
      <ul className="flex h-fit w-[200px] flex-col bg-white xl:w-[250px]">
        {Object.entries(groupedServices).map(([name, business]) => (
          <li
            key={name}
            className={clsx(
              'relative inset-0 flex flex-row items-center justify-center uppercase',
              'hover:bg-gradient-to-r hover:from-white hover:via-gray-100 hover:to-white',
              'transition-transform duration-300'
            )}
            onMouseEnter={() => onMouseEnter2(name || '')}
            onMouseLeave={onMouseLeave2}
          >
            <Link
              href={{
                pathname: `/area-de-practica/${business[0]?.unitBusiness?.slug}`,
              }}
              passHref
              className={clsx(
                'flex scale-95 py-3 text-center font-fira text-sm uppercase',
                'border-b border-gray-200',
                activeLink2 == name
                  ? 'font-normal text-neutral-800'
                  : 'font-light text-neutral-900'
              )}
            >
              {name}
            </Link>
            {business.length > 1 && activeLink2 == name && (
              <ul className="absolute left-full top-0 flex min-w-[250px] max-w-[320px] flex-col">
                {business.map((service, index) => (
                  <li
                    key={index}
                    className={clsx(
                      'relative inset-0 flex flex-row items-center justify-center bg-white uppercase',
                      'hover:bg-gradient-to-r hover:from-white hover:via-gray-100 hover:to-white',
                      'hover:font-bold hover:text-neutral-800',
                      'transition-transform duration-300'
                    )}
                    onMouseEnter={() => onMouseEnter3(service?.title || '')}
                    onMouseLeave={onMouseLeave3}
                  >
                    <Link
                      href={{
                        pathname: `/${link?.slug}/${service?.slug}`,
                      }}
                      passHref
                      className={clsx(
                        'flex py-3 text-center font-fira text-xs uppercase text-neutral-900',
                        'border-b border-gray-200',
                        activeLink3 == service?.title
                          ? 'font-normal'
                          : 'font-light',
                        'transition-colors duration-300 ease-in-out'
                      )}
                    >
                      {service?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubsectionsContainer;
