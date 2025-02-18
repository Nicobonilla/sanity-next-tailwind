import Link from 'next/link';

interface ItemBC {
  label: string;
  href: string;
  slug: string;
}

export interface BreadcrumbsProps {
  items: ItemBC[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="mb-2 ml-2 mt-6 text-sm text-gray-500">
      <ul className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index}>
            {index === items.length - 1 ? (
              <span>{item.label}</span>
            ) : (
              <Link href={{ pathname: item.href }} className="hover:underline">
                {item.label}
              </Link>
            )}
            {index < items.length - 2 && <span> / </span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
