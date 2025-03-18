import clsx from 'clsx';

const LiSkeleton = () => (
  <li className="nav-container animate-pulse">
    <div className="flex size-full h-10 w-full rounded bg-neutral-800" />
  </li>
);

export default function DrawerContentSkeleton({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <div
      className={clsx(
        'mobile-nav-drawer fixed right-0 top-0 z-40 h-screen bg-neutral-950',
        'shadow-lg transition-all duration-300 ease-in-out',
        isMenuOpen ? 'contact-drawer.open w-4/5 sm:w-3/4' : ' contact-drawer w-0'
      )}
    >
      <div className="max-h-screen overflow-y-auto p-6">
        {/* Logo */}
        <div className="z-20 mx-auto mb-10 flex h-24 items-center justify-center">
          {isMenuOpen && (
            <div className="h-16 w-32 rounded bg-neutral-800 animate-pulse" />
          )}
        </div>

        {/* Lista de ítems */}
        <ul className="min-w-[250px] space-y-4">
          {/* Simulamos 5 ítems como placeholder */}
          <LiSkeleton />
          <LiSkeleton />
          <LiSkeleton />
          <LiSkeleton />
          <LiSkeleton />
        </ul>
      </div>
    </div>
  );
}