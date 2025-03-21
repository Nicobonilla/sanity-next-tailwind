import { type TableOfComponentsProps } from './index';

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
      className={`pl-4 transition-all duration-300 ${isExpanded
        ? 'mb-4 max-h-[70vh] opacity-100'
        : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'
        } overflow-auto`}
    >
      {items?.map((item, index) => (
        <li
          key={index}
          className={`ml-${(item.style == 'h2' ? 1 : 2) * 2} cursor-pointer pt-2 leading-extra-tight`}
        >
          <a
            href={'#heading-' + item._key}
            className="text-justify font-robotoslab text-sm font-normal text-slate-700  hover:text-red-500"
            onClick={toggleExpanded}
            aria-hidden="true"
            tabIndex={-1}
          >
            {item?.text}
          </a>
        </li>
      ))}
    </ul>
  );
};
