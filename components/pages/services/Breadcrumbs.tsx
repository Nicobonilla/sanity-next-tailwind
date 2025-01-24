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
    <nav className="mb-6 text-sm text-gray-500">
      <ul className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="hover:underline">
              {item.label}
            </a>
            {index < items.length - 1 && <span> / </span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
