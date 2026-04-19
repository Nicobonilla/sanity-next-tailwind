import Link from 'next/link';

import { buildBreadcrumbJsonLd } from '@/lib/structured-data';

interface ItemBC {
  label: string;
  slug: string;
}

export interface BreadcrumbsProps {
  currentLabel?: string;
  currentPath?: string;
  items: ItemBC[];
}

export const Breadcrumbs = ({
  currentLabel,
  currentPath,
  items,
}: BreadcrumbsProps) => {
  const breadcrumbItems = [
    ...items.map((item) => ({
      label: item.label,
      path:
        item.slug === 'home'
          ? 'https://www.abogadossanfelipe.cl/'
          : `https://www.abogadossanfelipe.cl/${item.slug}`,
    })),
    ...(currentLabel
      ? [
          {
            label: currentLabel,
            path:
              currentPath || 'https://www.abogadossanfelipe.cl',
          },
        ]
      : []),
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-2 ml-2 mt-6 text-sm text-gray-700"
      >
        <ol className="flex flex-wrap items-center">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link
                href={item.slug === 'home' ? '/' : `/${item.slug}`}
                className="hover:underline"
              >
                {item.label}
              </Link>
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
          {currentLabel && (
            <li aria-current="page" className="flex items-center">
              <span className="mx-2">/</span>
              <span>{currentLabel}</span>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};
