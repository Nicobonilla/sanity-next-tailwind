//import { trackButtonClick } from '@/components/lib/GTMTrackers';
import clsx from 'clsx';
import Link from 'next/link';
import { type MouseEvent } from 'react';

export interface NavPageProps {
  page: {
    slug?: string | null;
    title?: string | null;
  };
  path: string;
  activeLink: string | null;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
  toggleDrawerForm?: () => void;
}

export default function NavLink({
  page,
  path,
  activeLink,
  onMouseEnter,
  onMouseLeave,
  toggleDrawerForm,
}: NavPageProps) {
  const handleClick = (e: MouseEvent) => {
    if (page.slug === 'contacto' && toggleDrawerForm) {
      e.preventDefault();
      toggleDrawerForm();
      //trackButtonClick(page.slug, 'desk-nav');
    }
  };

  return (
    <>
      {page.slug === 'services' || page.slug === 'contacto' ? (
        <button
          className={clsx(
            'truncate px-8 text-center font-montserrat text-sm uppercase text-neutral-800 drop-shadow-2xl',
            {
              'py-3 group-hover:text-white': page.slug !== 'contacto',
              'contact-drawer rounded-md bg-indigo-700 py-2 text-white hover:bg-indigo-600':
                page.slug === 'contacto',
              'bg-neutral-950 text-white':
                (path !== '/' &&
                  activeLink === 'services' &&
                  path === `/${page.slug}`) ||
                path === `/area-de-practica/derecho-familiar` ||
                path === `/area-de-practica/derecho-imobiliario`,
            }
          )}
          onClick={handleClick}
          onMouseEnter={() => onMouseEnter(page.slug || '')} // Usar valor por defecto si slug es null
          onMouseLeave={onMouseLeave}
        >
          {page.title}
        </button>
      ) : (
        <Link
          href={{ pathname: `/${page.slug || ''}` }} // Usar valor por defecto si slug es null
          passHref
          className={clsx(
            'truncate px-8 py-3 text-center font-montserrat text-sm uppercase text-neutral-800 drop-shadow-2xl',
            {
              'group-hover:text-white': page.slug !== 'contacto',
              'bg-neutral-900 text-white':
                path !== '/' &&
                (path === `/${page.slug}` || path.split('/')[1] === page.slug),
            }
          )}
        //onClick={() => trackButtonClick(page.slug || '', 'desk-nav')}
        >
          {page.title}
        </Link>
      )}
    </>
  );
}
