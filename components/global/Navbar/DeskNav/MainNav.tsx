import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import SubsectionsContainer from './SubsectionsContainer';
import { useSanityContext } from '@/context/SanityContext';
import { groupServicesByBusiness } from './utils';
import { usePathname } from 'next/navigation';
import { GetPagesNavQueryResult } from '@/sanity.types';
import SubsectionsContainerSimple from './SubsectionsContainerSimple';

const MainNav = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { pages, unitBusinessList } = useSanityContext();
  const path = usePathname();

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
        {(pages as GetPagesNavQueryResult)?.map((link) => (
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
                    path.split('/')[1] === activeLink),
              }
            )}
            onMouseEnter={() => onMouseEnter(link?.slug || '')}
            onMouseLeave={onMouseLeave}
          >
            {link?.slug === 'services' ? (
              <span
                className={clsx(
                  'truncate px-8 py-3 text-center font-fira text-sm uppercase text-neutral-800 drop-shadow-2xl',
                  {
                    'group-hover:text-white': link?.title != 'Contacto',
                    'bg-neutral-950 text-white':
                      (path !== '/' &&
                        activeLink === 'services' &&
                        path === `/${link?.slug}`) ||
                      path === `/area-de-practica/derecho-familiar` ||
                      path === `/area-de-practica/derecho-imobiliario`,
                  }
                )}
                onMouseEnter={() => onMouseEnter(link?.slug || '')}
                onMouseLeave={onMouseLeave}
              >
                {link?.title}
              </span>
            ) : (
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
            )}
            {link?.slug === 'services' &&
              (activeLink == link?.slug ||
                activeLink == 'derecho-familiar' ||
                activeLink == 'derecho-inmobiliario') && (
                <SubsectionsContainerSimple
                  unitBusinessList={unitBusinessList}
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
