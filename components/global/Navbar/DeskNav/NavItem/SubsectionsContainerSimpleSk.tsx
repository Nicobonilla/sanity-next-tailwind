import clsx from 'clsx';
import type { NavbarProps } from '../..';

interface SubsectionsContainerSimpleSkProps {
  unitBusinessList: NavbarProps['unitBusinessList'];
}

export default function SubsectionsContainerSimpleSk({
  unitBusinessList,
}: SubsectionsContainerSimpleSkProps) {
  return (
    <div className="absolute left-0 top-full z-50 w-[200px] bg-white shadow-lg xl:w-[250px] animate-pulse">
      <ul className="flex flex-col">
        {/* Simulamos un número fijo de ítems basado en unitBusinessList o un promedio */}
        {Array.from({ length: unitBusinessList?.length || 3 }).map((_, index) => (
          <li
            key={index}
            className={clsx(
              'relative flex items-center justify-center',
              'border-b border-gray-200'
            )}
          >
            <div className="w-full h-10 bg-gray-200" />
          </li>
        ))}
      </ul>
    </div>
  );
}