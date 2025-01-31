import { Links } from '@/types';
import { useState } from 'react';
import Link from 'next/link';

interface SubsectionsContainerProps {
  link: Links;
  activeLink: string | null;
  groupedServices: Record<string, Links[]>;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
}

const SubsectionsContainer = ({
  link,
  activeLink,
  groupedServices,
}: SubsectionsContainerProps) => {
  const [activeLink2, setActiveLink2] = useState<string | null>(null);
  const onMouseEnter2 = (slug: string) => {
    setActiveLink2(slug);
  };

  const onMouseLeave2 = () => {
    setActiveLink2(null);
  };
  return (
    <div className="absolute inset-0 -left-20 top-full z-50">
      <ul className="mx-auto flex h-fit w-[200px] flex-col bg-white xl:w-[280px]">
        {Object.entries(groupedServices).map(([name, business]) => (
          <li
            key={name}
            className="nav-bg-subsection group relative"
            onMouseEnter={() => onMouseEnter2(name || '')}
            onMouseLeave={onMouseLeave2}
          >
            <div className="nav-subsection-desk bottom-0 flex flex-row items-center text-center uppercase">
              <Link
                href={{
                  pathname: `/${link?.slug}/${business[0]?.unitBusiness?.slug}`,
                }}
                className="size-full py-4"
              >
                <span className="w-full border-b border-gray-200 py-4">
                  {name}
                </span>
              </Link>

              {business.length > 1 && activeLink2 == name && (
                <ul className="absolute left-full top-0 flex min-w-[250px] flex-col divide-y divide-gray-200">
                  {business.map((service, index) => (
                    <li
                      key={index}
                      className="nav-bg-subsection size-full bg-white py-3"
                    >
                      <Link
                        href={{
                          pathname: `/${link?.slug}/${service?.slug}`,
                        }}
                        className="nav-subsection-desk size-full"
                      >
                        {service?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubsectionsContainer;
