interface ItemBC {
  label: string
  href: string
}

export interface BreadcrumbsProps {
    items:ItemBC[]
  }
  
  export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {

    return (
      <nav className="text-sm text-gray-500 mb-6">
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
    )
  }
  