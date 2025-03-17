import clsx from 'clsx';
import type { NavbarProps } from '..';
import MobileNavClient from './MobileNavClient';

export default function MobileNav({ pages, unitBusinessList, logo, slogan }: NavbarProps) {
  return (
    <div className="right-0 z-50 flex h-full grow-0 lg:hidden">
      <div className={clsx('relative flex h-full')}>
        <MobileNavClient pages={pages} unitBusinessList={unitBusinessList}
          logo={logo} slogan={slogan} />
      </div>
    </div>
  );
}
