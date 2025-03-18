import clsx from 'clsx';
import type { NavPageProps } from './NavLink';

export default function NavLinkSkeleton({ page }: { page: NavPageProps['page'] }) {
  return (
    <div
      className={clsx(
        'truncate px-8 text-center animate-pulse', // Base estática
        {
          'h-10 w-24 rounded bg-neutral-800': page.slug !== 'contacto', // Para 'services' y otros
          'h-8 w-32 rounded-md bg-indigo-700/80': page.slug === 'contacto', // Para 'contacto'
        }
      )}
    />
  );
}