import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import SubsectionsContainer from './SubsectionsContainer';
import { useSanityContext } from '@/context/SanityContext';
import { groupServicesByBusiness } from './utils';
import { usePathname } from 'next/navigation';

const MainNav = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { pagesLink } = useSanityContext();
  const groupedServices = groupServicesByBusiness(pagesLink);
  const path = usePathname();

  console.log('pagesLink: ', pagesLink);
  console.log('path: ', path);
  console.log("path.split('/')[1]", path.split('/')[1]);

  const onMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const onMouseLeave = () => {
    setActiveLink(null);
  };
  return (
    <div>
      <ul className="flex h-full items-end justify-center">
        {pagesLink?.map((link) => (
          <li
            key={link?.title}
            className={clsx(
              'group relative my-auto flex size-full cursor-pointer items-center justify-center',
              {
                'hover:bg-neutral-950 hover:text-white':
                  link?.title != 'Contacto',
                'ml-4 h-8 rounded-sm bg-blue-900/70 hover:bg-blue-900/80':
                  link?.title == 'Contacto',
                'bg-neutral-950 text-white':
                  path !== '/' &&
                  (path === `/${link?.slug}` ||
                    path.split('/')[1] === `${link?.slug}`),
              }
            )}
            onMouseEnter={() => onMouseEnter(link?.title || '')}
            onMouseLeave={onMouseLeave}
          >
            <Link
              href={{ pathname: `/${link?.slug}` }}
              passHref
              className={clsx(
                'truncate px-8 py-3 text-center font-fira text-sm uppercase text-neutral-800 drop-shadow-2xl',
                {
                  'group-hover:text-white': link?.title != 'Contacto',
                  'text-white':
                    link?.title == 'Contacto' ||
                    (path !== '/' &&
                      (path === `/${link?.slug}` ||
                        path.split('/')[1] === `${link?.slug}`)),
                }
              )}
            >
              {link?.title}
            </Link>
            {link?.subsections &&
              link.subsections?.length > 0 &&
              activeLink === link.title && (
                <SubsectionsContainer
                  link={link}
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
