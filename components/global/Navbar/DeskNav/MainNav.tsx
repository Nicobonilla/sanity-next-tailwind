import { useState } from 'react';
import { useSanityContext } from '@/context/SanityContext';
import { usePathname } from 'next/navigation';
import { GetPagesNavQueryResult } from '@/sanity.types';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import NavItem from './NavItem';

const MainNav = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { pages, unitBusinessList } = useSanityContext();
  const path = usePathname();
  const { toggleDrawerForm } = useContactDrawerContext();

  const onMouseEnter = (slug: string) => {
    setActiveLink(slug);
  };

  const onMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <div>
      <ul className="flex h-full items-end justify-center">
        {(pages as GetPagesNavQueryResult)?.map((link) => (
          <NavItem
            key={link.slug}
            link={{ slug: link?.slug, title: link?.title }}
            path={path}
            activeLink={activeLink}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            toggleDrawerForm={toggleDrawerForm}
            unitBusinessList={unitBusinessList}
          />
        ))}
      </ul>
    </div>
  );
};

export default MainNav;
