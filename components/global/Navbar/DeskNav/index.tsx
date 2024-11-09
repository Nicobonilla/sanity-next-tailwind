'use client';
import { NavProps } from '@/types';
import SubsectionsFullWidth from './SubsectionsFullWidth';

export default function DeskNav({ scrolling }: { scrolling: boolean }) {
  return (
    <>
      {/* <Simple links={links} /> */}
      <SubsectionsFullWidth  scrolling={scrolling}/>
    </>
  );
}
