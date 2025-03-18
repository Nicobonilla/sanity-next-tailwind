//import { trackButtonClick } from '@/components/lib/GTMTrackers';
import clsx from 'clsx';
import Link from 'next/link';

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
}: NavPageProps) {

  return (
    <>
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
    </>
  );
}
