'use client';
import clsx from 'clsx';
import SubsectionsContainerSimple from './SubsectionsContainerSimple';
import NavLink from './NavLink';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
interface NavItemProps {
  page: {
    slug: string | null;
    title: string | null;
  };
  unitBusinessList?: {
    slug: string | null;
    title: string | null;
  }[];
}

export default function NavItem({ page,
  unitBusinessList,
}: NavItemProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const path = usePathname();
  const { toggleDrawerForm } = useContactDrawerContext();

  const onMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const onMouseLeave = () => {
    setActiveLink(null);
  };

  const isContact = page.slug === 'contacto';
  const isServices = page.slug === 'services';

  return (
    <li
      key={page.title}
      className={clsx(
        'group relative my-auto flex size-full cursor-pointer items-center justify-center',
        {
          'hover:bg-neutral-950 hover:text-white': !isContact,
          'ml-4 h-8 rounded-sm bg-blue-900/90 hover:bg-blue-950': isContact,
          'bg-neutral-950 text-white':
            path !== '/' && path === `/${page.slug}`,
        }
      )}
      onMouseEnter={() => onMouseEnter(page.slug || '')}
      onMouseLeave={onMouseLeave}
    >
      <NavLink
        link={page}
        path={path}
        activeLink={activeLink}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        toggleDrawerForm={toggleDrawerForm || (() => { })}
      />
      {isServices && unitBusinessList &&
        (activeLink === page.slug ||
          activeLink === 'derecho-familiar' ||
          activeLink === 'derecho-inmobiliario') && (
          <SubsectionsContainerSimple
            unitBusinessList={unitBusinessList}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        )}
    </li>
  );
}
