import { TableOfComponentsProps } from './index';
import { slugify } from '@/lib/slugify';

interface TocListProps {
  items: TableOfComponentsProps | null;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export const TocList = ({
  items,
  isExpanded,
  toggleExpanded,
}: TocListProps) => {
  return (
    <ul
      className={`pl-4 transition-all duration-300 ${
        isExpanded
          ? 'mb-4 max-h-[70vh] opacity-100'
          : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'
      } overflow-auto bg-gray-100`}
    >
      {items?.map((item, index) => (
        <li
          key={index}
          className={`${item.style === 'h2' ? 'ml-2' : 'ml-4'} cursor-pointer pt-2 leading-extra-tight`}
        >
          <a
            href={`#heading-${slugify(item?.text || '')}`}
            className="p3 text-sm hover:text-red-500"
            onClick={toggleExpanded}
          >
            {item?.text}
          </a>
        </li>
      ))}
    </ul>
  );
};
