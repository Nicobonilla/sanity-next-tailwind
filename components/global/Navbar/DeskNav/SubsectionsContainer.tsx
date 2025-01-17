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
  console.log('groupedServices: ', groupedServices);
  console.log('link: ', link);
  console.log('activeLink: ', activeLink);
  return (
    <div className="absolute inset-0 left-0 top-full z-50">
      <ul className="nav-bg-subsection mx-auto flex h-fit w-[280px] flex-col">
        {Object.entries(groupedServices).map(([name, business]) => (
          <li
            key={name}
            className="group relative"
            onMouseEnter={() => onMouseEnter2(name || '')}
            onMouseLeave={onMouseLeave2}
          >
            <div className="nav-subsection-desk bottom-0 flex flex-row items-center uppercase text-center">
              <span className="w-full border-b py-4 border-gray-200">
                {name}
              </span>

              {business.length > 1 && activeLink2 == name && (
                <ul className="nav-bg-subsection absolute left-full top-0 flex min-w-[300px] flex-col divide-y divide-gray-200 hover:bg-white">
                  {business.map((service, index) => (
                    <li key={index} className="py-2">
                      <Link
                        href={{
                          pathname: `/${link?.slug}/${service?.slug}`,
                        }}
                        className="nav-subsection-desk"
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
