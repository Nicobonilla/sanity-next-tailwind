'use client';
import DrawerNav from './DrawerNav';
import {
  GetPagesNavQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';

export default function MobileNav({
  pages,
  unitBusinessList,
  logo,
  slogan,
}: {
  pages: GetPagesNavQueryResult;
  unitBusinessList: GetUnitBusinessListQueryResult;
  logo?: string | null;
  slogan?: string | null;
}) {
  return (
    <DrawerNav
      pages={pages}
      unitBusinessList={unitBusinessList}
      logo={logo}
      slogan={slogan}
    />
  );
}
MobileNav;
