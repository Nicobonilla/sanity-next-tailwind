import clsx from 'clsx';
import type { NavbarProps } from '../..';

interface SubsectionsContainerSimpleSkProps {
  unitBusinessList: NavbarProps['unitBusinessList'];
}

export default function SubsectionsContainerSimpleSk({
  unitBusinessList,
}: SubsectionsContainerSimpleSkProps) {

  return (
    <div className="absolute left-0 top-full z-50 w-[200px] bg-white shadow-lg xl:w-[250px]">
      <ul className="flex flex-col">
        {unitBusinessList?.map((business) => (
          <li
            key={business.slug}
            className={clsx(
              'relative flex items-center justify-center uppercase transition-colors duration-300',
              'hover:bg-gradient-to-r hover:from-white hover:via-gray-200 hover:to-white'
            )}
          >
            <a
              href={`/area-de-practica/${business.slug}`}
              className={clsx(
                'w-full py-3 text-center font-montserrat text-sm',
                'border-b border-gray-200',
                'font-light text-neutral-900'
              )}
            >
              {business.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
