import Link from 'next/link';
import clsx from 'clsx';
import Logo from '@/components/global/Logo';
import type { DrawerContentProps } from './DrawerContent';
//import { trackButtonClick } from '@/components/lib/GTMTrackers';

type DrawerContentSkProps = Omit<DrawerContentProps, 'closeMenu'>;

const Li: React.FC<{ title: string; slug: string }> = ({ title, slug }) => (
  <li key={slug} className="nav-container">
    <Link
      href={`/area-de-practica/${slug}`}
      className={'flex size-full'}
    >
      {title}
    </Link>
  </li>)


export default function DrawerContentSk({
  data,
  isMenuOpen,
}: DrawerContentSkProps) {

  return (
    <div
      className={clsx(
        'mobile-nav-drawer fixed right-0 top-0 z-40 h-screen bg-neutral-950',
        'shadow-lg transition-all duration-300 ease-in-out',
        isMenuOpen ? 'w-4/5 translate-x-0 sm:w-3/4' : 'w-0 translate-x-full'
      )}
    >
      <nav className="max-h-screen overflow-y-auto p-6">
        <div className="z-20 mx-auto mb-10 flex h-24 items-center justify-center text-white">
          {isMenuOpen && <Logo logo={data.logo} slogan={data.slogan} />}
        </div>
        <ul className="min-w-[250px]">
          {data.pages.map((page) =>
            page.slug === 'services' ? (
              data.unitBusinessList?.map((business) => (
                <Li key={business.slug}
                  title={business.title}
                  slug={`/area-de-practica/${business.slug}`}
                />
              ))
            ) : page.slug === 'contacto' ? (
              <li key={page.slug} className="nav-container">
                <button
                  className="nav-container-active flex size-full text-base hover:text-lg"
                >
                  {page.title}
                </button>
              </li>
            ) : (
              <Li key={page.slug}
                title={page.title}
                slug={`/area-de-practica/${page.slug}`}
              />
            )
          )}
        </ul>
      </nav >
    </div >
  );
}
