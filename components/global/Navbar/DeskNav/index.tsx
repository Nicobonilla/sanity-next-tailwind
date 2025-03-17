import NavItem from './NavItem';
import { type GetPagesNavQueryResult } from '@/sanity.types';
import type { NavbarProps } from '..';


export default function DeskNav({
  pages, unitBusinessList
}: Omit<NavbarProps, 'logo' | 'slogan'>) {
  return (
    <div>
      <ul className="flex h-full items-end justify-center">
        {(pages as GetPagesNavQueryResult)?.map((pageLink) => (
          <NavItem
            key={pageLink.slug}
            page={{ slug: pageLink?.slug, title: pageLink?.title }}
            unitBusinessList={unitBusinessList}
          />
        ))}
      </ul>
    </div>
  )
}
