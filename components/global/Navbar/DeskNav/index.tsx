'use client';
import { NavProps } from '@/types';
import SubsectionsFullWidth from './SubsectionsFullWidth';

export default function DeskNav({ links }: NavProps) {
  return (
    <>
      {/* <Simple links={links} /> */}
      <SubsectionsFullWidth links={links} />
    </>
  );
}
