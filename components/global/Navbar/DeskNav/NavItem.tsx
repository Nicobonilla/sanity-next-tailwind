import clsx from 'clsx';
import { useState } from 'react';
import SubsectionsContainerSimple from './variants/SubsectionsContainerSimple';
import NavLink from './NavLink';

interface NavItemProps {
  link: {
    slug?: string | null;
    title?: string | null;
  };
  path: string;
  activeLink: string | null;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
  toggleDrawer?: () => void;
  unitBusinessList: any[];
}

export default function NavItem({
  link,
  path,
  activeLink,
  onMouseEnter,
  onMouseLeave,
  toggleDrawer,
  unitBusinessList,
}: NavItemProps) {
  const isContact = link.slug === 'contacto';
  const isServices = link.slug === 'services';
  
  return (
    <li
      key={link.title}
      className={clsx(
        'group relative my-auto flex size-full cursor-pointer items-center justify-center',
        {
          'hover:bg-neutral-950 hover:text-white': !isContact,
          'ml-4 h-8 rounded-sm bg-blue-900/70 hover:bg-blue-950/80': isContact,
          'bg-neutral-950 text-white':
            path !== '/' && !isContact && path === `/${link.slug}`,
        }
      )}
      onMouseEnter={() => onMouseEnter(link.slug || '')}
      onMouseLeave={onMouseLeave}
    >
      <NavLink
        link={link}
        path={path}
        activeLink={activeLink}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        toggleDrawer={toggleDrawer}
      />
      {isServices &&
        (activeLink === link.slug ||
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
