import Link from 'next/link';

interface ItemBC {
  label: string;
  slug: string;
}

interface BreadcrumbsProps {
  items: ItemBC[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="mb-2 ml-2 mt-6 text-sm text-gray-700">
      <ul className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={`/${item.slug}`} className="hover:underline">
              {item.label}
            </Link>
            {index < items.length && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
