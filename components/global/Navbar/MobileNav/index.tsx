import clsx from 'clsx';
import type { NavbarProps } from '..';
import MobileNavClient from './MobileNavClient';
import { Suspense } from 'react';
import MobileNavSkeleton from './MobileNavSkeleton';

export default function MobileNav({
  pages,
  unitBusinessList,
  logo,
  slogan
}: Omit<NavbarProps, 'initialScrolling'>) {
  return (
    <div className="right-0 z-50 flex h-full grow-0 lg:hidden">
      <div className={clsx('relative flex h-full')}>
        <Suspense fallback={<MobileNavSkeleton />}>
          <MobileNavClient
            pages={pages}
            unitBusinessList={unitBusinessList}
            logo={logo}
            slogan={slogan} />
        </Suspense>

      </div>
    </div>
  );
}
