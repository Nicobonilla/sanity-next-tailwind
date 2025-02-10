import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import SubsectionsContainer from './SubsectionsContainer';
import { useSanityContext } from '@/context/SanityContext';
import { useScrollContext } from '@/context/ScrollContext';
import { groupServicesByBusiness } from './utils';
import { usePathname } from 'next/navigation';

const MainNav = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { pagesLink } = useSanityContext();
  const { scrolling } = useScrollContext();
  const groupedServices = groupServicesByBusiness(pagesLink);
  const path = usePathname();

  //console.log('pagesLink: ', pagesLink);
  //console.log('path: ', path);

  const onMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const onMouseLeave = () => {
    setActiveLink(null);
  };
  return (
    <div>
      <ul className="flex h-full items-center justify-center">
        {pagesLink?.map((link) => (
          <li
            key={link?.title}
            className="group relative my-auto flex h-full cursor-pointer items-center justify-center px-4 py-4 hover:bg-white 2xl:px-8"
            onMouseEnter={() => onMouseEnter(link?.title || '')}
            onMouseLeave={onMouseLeave}
          >
            <Link href={{ pathname: `/${link?.slug}` }} passHref>
              <span
                className={clsx(
                  'nav inline-flex items-center justify-center uppercase text-neutral-800 drop-shadow-xl',
                  {
                    'w-full text-red-900':
                      path !== '/' && path === `/${link?.slug}`,
                  }
                )}
              >
                {link?.title}
              </span>
              <div
                className={clsx(
                  'relative w-0 border-b-2 border-gray-200 transition-all duration-300 ease-in-out group-hover:w-full',
                  {
                    'w-full': path !== '/' && path === `/${link?.slug}`,
                  }
                )}
              />
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
        ))}
      </ul>
    </div>
  );
};

export default MainNav;
