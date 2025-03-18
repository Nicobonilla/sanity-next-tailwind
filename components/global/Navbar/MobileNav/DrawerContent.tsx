import Link from 'next/link';
import clsx from 'clsx';
import Logo from '@/components/global/Logo';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import { usePathname } from 'next/navigation';
import type { NavbarProps } from '..';
//import { trackButtonClick } from '@/components/lib/GTMTrackers';

type DrawerContentProps = Omit<NavbarProps, 'logo' | 'slogan'> & {
  logo: string;
  slogan: string;
  isMenuOpen: boolean;
  closeMenu: () => void;
};

export default function DrawerContent({
  pages,
  unitBusinessList,
  logo,
  slogan,
  isMenuOpen,
  closeMenu,
}: DrawerContentProps) {
  const { toggleDrawerForm } = useContactDrawerContext();
  const path = usePathname();

  return (
    <div
      className={`mobile-nav-drawer fixed right-0 top-0 z-40 h-screen w-4/5 sm:w-3/4 bg-neutral-950 shadow-lg ${isMenuOpen ? "open" : ""}`}
    >
      <nav className="max-h-screen overflow-y-auto p-6">
        <div className="z-20 mx-auto mb-10 flex h-24 items-center justify-center text-white">
          {isMenuOpen && <Logo logo={logo} slogan={slogan} />}
        </div>
        <ul className="min-w-[250px]">
          {pages.map((page) =>
            page.slug === 'services' ? (
              unitBusinessList?.map((business) => (
                <li key={business.slug} className="nav-container">
                  <Link
                    href={`/area-de-practica/${business.slug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                      //trackButtonClick(business.slug, 'drawer-nav');
                    }}
                    className={clsx(
                      'flex size-full',
                      path === `/area-de-practica/${business.slug}` &&
                      'nav-container-active'
                    )}
                  >
                    {business.title}
                  </Link>
                </li>
              ))
            ) : page.slug === 'contacto' ? (
              <li key={page.slug} className="nav-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDrawerForm();
                    closeMenu();
                    //trackButtonClick('contacto', 'drawer-nav');
                  }}
                  className="nav-container-active flex size-full text-base hover:text-lg"
                >
                  {page.title}
                </button>
              </li>
            ) : (
              <li key={page.slug} className="nav-container">
                <Link
                  href={`/${page.slug}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    //trackButtonClick(page.slug, 'drawer-nav');
                    closeMenu();
                  }}
                  className={clsx(
                    'flex size-full',
                    path === `/${page.slug}` && 'nav-container-active'
                  )}
                >
                  {page.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
}
