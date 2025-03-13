import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { type GetUnitBusinessListQueryResult } from '@/sanity.types';
//import { trackButtonClick } from '@/components/lib/GTMTrackers';

interface SubsectionsContainerSimpleProps {
  unitBusinessList: GetUnitBusinessListQueryResult;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
}

export default function SubsectionsContainerSimple({
  unitBusinessList,
  onMouseEnter,
  onMouseLeave,
}: SubsectionsContainerSimpleProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleMouseEnter = (slug: string) => {
    setActiveLink(slug);
    onMouseEnter(slug); // Propagar el evento al componente padre
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
    onMouseLeave(); // Propagar el evento al componente padre
  };

  return (
    <div className="absolute left-0 top-full z-50 w-[200px] bg-white shadow-lg xl:w-[250px]">
      <ul className="flex flex-col">
        {unitBusinessList.map((business, index) => (
          <li
            key={business.slug}
            className={clsx(
              'relative flex items-center justify-center uppercase transition-colors duration-300',
              'hover:bg-gradient-to-r hover:from-white hover:via-gray-200 hover:to-white',
              {
                'bg-gray-100': activeLink === business.slug,
              }
            )}
            onMouseEnter={() => handleMouseEnter(business.slug || '')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={`/area-de-practica/${business.slug}`}
              passHref
              //onClick={() => trackButtonClick(business.slug || '', 'desk-nav')}
              className={clsx(
                'w-full py-3 text-center font-montserrat text-sm',
                'border-b border-gray-200',
                {
                  'font-normal text-neutral-800': activeLink === business.slug,
                  'font-light text-neutral-900': activeLink !== business.slug,
                }
              )}
            >
              {business.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
