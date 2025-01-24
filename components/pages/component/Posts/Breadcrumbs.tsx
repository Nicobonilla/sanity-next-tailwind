import Link from 'next/link';

interface ItemBC {
  label: string;
  href: string;
  slug: string;
}

export const Breadcrumbs = ({ items }: { items: ItemBC[] }) => {
  return (
    <nav className="z-50 mx-5 mb-6 text-sm text-gray-500">
      <ul className="flex space-x-1">
        {items.map((item, index) => (
          <li key={item.slug} className="flex items-center">
            <Link
              href={{ pathname: item.href }}
              className={`cursor-pointer overflow-hidden hover:text-blue-900 hover:underline ${
                index === items.length - 1 ? 'truncate-label' : ''
              }`}
            >
              {index === items.length - 1 ? (
                <span className="truncate-label">{item.label}</span>
              ) : (
                item.label
              )}
            </Link>
            {index < items.length - 1 && <span className="px-1">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
