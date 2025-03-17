//import { trackButtonClick } from '@/components/lib/GTMTrackers';
import clsx from 'clsx';
import type { NavPageProps } from './NavLink';

export default function NavLinkSkeleton({ page }: { page: NavPageProps['page'] }) {
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
            }
          )}
        >
          {page.title}
        </button>
      ) : (
        <a
          href={`/${page.slug || ''}`} // Usar valor por defecto si slug es null
          className={clsx(
            'truncate px-8 py-3 text-center font-montserrat text-sm uppercase text-neutral-800 drop-shadow-2xl',
            {
              'group-hover:text-white': page.slug !== 'contacto',
            }
          )}
        >
          {page.title}
        </a>
      )}
    </>
  );
}