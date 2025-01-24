import { ComponentProps } from '@/components/types';
import { GetPostDetailQueryResult } from '@/sanity.types';

export type TableOfComponentsProps =
  NonNullable<GetPostDetailQueryResult>['tableOfContents'];

export const TableOfContents = (items: TableOfComponentsProps) => {
  return (
    <nav>
      <h2 className="mb-4 border-l-4 border-red-500 pl-4 font-semibold">
        Table de Contenido
      </h2>
      <ul className="border-l-4 border-gray-200 pl-4">
        {items &&
          items.map((item, index) => (
            <li
              key={index}
              className={`ml-${(item.style == 'h2' ? 1 : 2) * 2} cursor-pointer pt-2 leading-extra-tight`}
            >
              <a
                href={'#heading-' + item._key} // Vincula al mismo ID
                className="p3 text-sm hover:text-red-500"
                aria-hidden="true"
                tabIndex={-1}
              >
                {item?.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};
