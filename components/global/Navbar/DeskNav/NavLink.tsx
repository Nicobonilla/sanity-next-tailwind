import clsx from 'clsx';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface NavPageProps {
  link: {
    slug?: string | null;
    title?: string | null;
  };
  path: string;
  activeLink: string | null;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
  toggleDrawer?: () => void;
}

export default function NavLink({
  link,
  path,
  activeLink,
  onMouseEnter,
  onMouseLeave,
  toggleDrawer,
}: NavPageProps) {

  const handleClick = (e: MouseEvent) => {
    if (link.slug === 'contacto' && toggleDrawer) {
      e.preventDefault();
      toggleDrawer();
    }
  };

  return (
    <>
      {link.slug === 'services' || link.slug === 'contacto' ? (
        <button
          className={clsx(
            'truncate px-8 py-3 text-center font-fira text-sm uppercase text-neutral-800 drop-shadow-2xl',
            {
              'group-hover:text-white': link.slug !== 'contacto',
              'contact-drawer text-white': link.slug === 'contacto',
              'bg-neutral-950 text-white':
                (path !== '/' &&
                  activeLink === 'services' &&
                  path === `/${link.slug}`) ||
                path === `/area-de-practica/derecho-familiar` ||
                path === `/area-de-practica/derecho-imobiliario`,
            }
          )}
          onClick={handleClick}
          onMouseEnter={() => onMouseEnter(link.slug || '')} // Usar valor por defecto si slug es null
          onMouseLeave={onMouseLeave}
        >
          {link.title}
        </button>
      ) : (
        <Link
          href={{ pathname: `/${link.slug || ''}` }} // Usar valor por defecto si slug es null
          passHref
          className={clsx(
            'truncate px-8 py-3 text-center font-fira text-sm uppercase text-neutral-800 drop-shadow-2xl',
            {
              'group-hover:text-white': link.slug !== 'contacto',
              'bg-neutral-900 text-white':
                path !== '/' &&
                (path === `/${link.slug}` || path.split('/')[1] === link.slug),
            }
          )}
        >
          {link.title}
        </Link>
      )}
    </>
  );
}
