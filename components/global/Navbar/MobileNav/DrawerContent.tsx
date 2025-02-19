import Link from 'next/link';
import clsx from 'clsx';
import Logo from '@/components/global/Logo';

interface DrawerContentProps {
  isMenuOpen: boolean;
  pages: any[];
  unitBusinessList: any[];
  path: string;
  toggleDrawerForm: () => void;
  closeMenu: () => void;
}

const DrawerContent = ({
  isMenuOpen,
  pages,
  unitBusinessList,
  path,
  toggleDrawerForm,
  closeMenu,
}: DrawerContentProps) => (
  <div
    className={`fixed right-0 top-0 z-50 h-screen bg-neutral-950 shadow-lg transition-all duration-500 ease-in-out ${
      isMenuOpen ? 'w-4/5 translate-x-0 sm:w-3/4' : 'w-0 translate-x-full'
    }`}
  >
    <nav className="max-h-screen overflow-y-auto p-6">
      <div className="z-20 mx-auto mb-10 flex h-24 items-center justify-center text-white">
        {isMenuOpen && <Logo />}
      </div>
      <ul className="min-w-[250px] items-center uppercase text-white">
        {pages.map((page) =>
          page.slug === 'services' ? (
            unitBusinessList?.map((business) => (
              <li key={business.slug} className="nav-container">
                <Link
                  href={`/area-de-practica/${business.slug}`}
                  onClick={closeMenu}
                  className={clsx(
                    'nav-item',
                    path === `/area-de-practica/${business.slug}` &&
                      'nav-item-active'
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
                  document.body.style.overflow = 'hidden';
                  toggleDrawerForm();
                  closeMenu();
                }}
                className={clsx(
                  'nav-item w-full text-left uppercase',
                  path === `/${page.slug}` && 'nav-item-active'
                )}
              >
                {page.title}
              </button>
            </li>
          ) : (
            <li key={page.slug} className="nav-container">
              <Link
                href={`/${page.slug}`}
                onClick={closeMenu}
                className={clsx(
                  'nav-item',
                  path === `/${page.slug}` && 'nav-item-active'
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

export default DrawerContent;
