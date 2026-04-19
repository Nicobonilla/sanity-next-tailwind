'use client';
import MainNav from './MainNav';
import {
  GetPagesNavQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';

export default function DeskNav({
  pages,
  unitBusinessList,
}: {
  pages: GetPagesNavQueryResult;
  unitBusinessList: GetUnitBusinessListQueryResult;
}) {
  return (
    <nav className="">
      <MainNav pages={pages} unitBusinessList={unitBusinessList} />
    </nav>
  );
}
