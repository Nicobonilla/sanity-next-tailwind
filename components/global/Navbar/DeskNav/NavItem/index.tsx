'use client';
import clsx from 'clsx';
import SubsectionsContainerSimple from './SubsectionsContainerSimple';
import NavLink from './NavLink';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import type { DeskNavProps } from '..';

export default function NavItem({ pages,
  unitBusinessList,
}: DeskNavProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const path = usePathname();
  const { toggleDrawerForm } = useContactDrawerContext();

  const onMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const onMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <>
      {pages?.map((page: DeskNavProps['pages'][number]) => (
        <li
          key={page.title}
          className={clsx(
            'group relative my-auto flex size-full cursor-pointer items-center justify-center',
            {
              'hover:bg-neutral-950 hover:text-white':
                !(page.slug === 'contacto'),
              'ml-4 h-8 rounded-sm bg-blue-900/90 hover:bg-blue-950':
                page.slug === 'contacto',
              'bg-neutral-950 text-white':
                path !== '/' && path === `/${page.slug}`,
            }
          )}
          onMouseEnter={() => onMouseEnter(page.slug || '')}
          onMouseLeave={onMouseLeave}
        >
          <NavLink
            page={page}
            path={path}
            activeLink={activeLink}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            toggleDrawerForm={toggleDrawerForm || (() => { })}
          />
          {page.slug === 'services' && unitBusinessList &&
            (activeLink === page.slug ||
              activeLink === 'derecho-familiar' ||
              activeLink === 'derecho-inmobiliario') && (
              <SubsectionsContainerSimple
                unitBusinessList={unitBusinessList}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            )}
        </li>))
      }
    </>
  );
}
