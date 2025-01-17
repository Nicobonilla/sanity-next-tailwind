import { Links } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import SubsectionsContainer from './SubsectionsContainer';
import { usePathname } from 'next/navigation';
import { useSanityContext } from '@/context/SanityContext';
import { useScrollContext } from '@/context/ScrollContext';
import { groupServicesByBusiness } from './utils';

const MainNav = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { pagesLink } = useSanityContext();
  console.log('pagesLink: ', pagesLink);
  const { scrolling } = useScrollContext();
  const groupedServices = groupServicesByBusiness(pagesLink);
  console.log('groupedServices: ', groupedServices);
  const onMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const onMouseLeave = () => {
    setActiveLink(null);
  };
  return (
    <>
      <ul className="flex h-full items-center justify-center">
        {pagesLink?.map((link) => (
          <>
            <li
              key={link?.title}
              className="group relative my-auto flex h-full cursor-pointer items-center justify-center px-4 2xl:px-8"
              onMouseEnter={() => onMouseEnter(link?.title || '')}
              onMouseLeave={onMouseLeave}
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
                <div className="absolute w-0 border-b-2 border-gray-200 transition-all duration-300 ease-in-out group-hover:w-4/5 group-hover:xl:w-[70%] group-hover:2xl:w-3/5" />
              </Link>
              {link?.subsections &&
                link.subsections?.length > 0 &&
                activeLink === link.title && (
                  <SubsectionsContainer
                    link={link}
                    activeLink={activeLink}
                    groupedServices={groupedServices}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                )}
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default MainNav;
