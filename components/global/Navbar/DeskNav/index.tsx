import NavItem from './NavItem';
import { Suspense } from 'react';
import NavItemSkeleton from './NavItem/NavItemSkeleton';
import type { NavbarProps } from '..';

export type DeskNavProps = Omit<NavbarProps, 'logo' | 'slogan' | 'initialScrolling'>

export default function DeskNav({
  pages, unitBusinessList
}: DeskNavProps) {
  return (
    <div>
      <ul className="flex h-full items-end justify-center">
        <Suspense fallback={
          <NavItemSkeleton
            pages={pages}
            unitBusinessList={unitBusinessList} />
        }>
          <NavItem
            pages={pages}
            unitBusinessList={unitBusinessList}
          />
        </Suspense>
      </ul>
    </div>
  )
}