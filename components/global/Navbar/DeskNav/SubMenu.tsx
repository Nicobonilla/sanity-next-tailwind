import { Links } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubMenuProps {
  business: Links[];
  link: Links;
  onMouseEnter: (slug: string) => void;
  onMouseLeave: () => void;
}

const SubMenu = ({
  business,
  link,
  onMouseEnter,
  onMouseLeave,
}: SubMenuProps) => {
  const path = usePathname();

  return (
    <li className="group relative">
      <div className="nav-subsection-desk buttom-0 flex flex-row items-center text-center text-sm font-light uppercase">
        <span className="w-full border-b-2 border-gray-200 py-2 text-center">
          {Object.keys(business)[0]}
        </span>
        <ul className="absolute left-full top-0 hidden min-w-[200px] bg-black group-hover:block">
          {Object.values(business)[0].map(
            (service: SubMenuProps['business']) => (
              <li key={service.id} className="py-2">
                <Link
                  href={`/${link?.slug}/${service.slug}`}
                  className="nav-subsection-desk block text-white hover:text-red-400"
                >
                  {service.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </li>
  );
};
export default SubMenu;
