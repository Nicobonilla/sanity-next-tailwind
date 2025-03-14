import clsx from 'clsx';
import SubsectionsContainerSimple from './SubsectionsContainerSimple';
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
  toggleDrawerForm?: () => void;
  unitBusinessList: any[];
}

export default function NavItem({
  link,
  path,
  activeLink,
  onMouseEnter,
  onMouseLeave,
  toggleDrawerForm,
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
          'ml-4 h-8 rounded-sm bg-blue-900/90 hover:bg-blue-950': isContact,
          'bg-neutral-950 text-white':
            path !== '/' && path === `/${link.slug}`,
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
        toggleDrawerForm={toggleDrawerForm || (() => { })}
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
