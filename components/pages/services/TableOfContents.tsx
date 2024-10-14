interface TableOfContentsProps {
  items: Array<{
    _key: string;
    style: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal" | null;
    children: Array<{
      text: string | null;
    }> | null;
  }> | null;
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {

  return (
    <nav className="scale-y-90">
      <h2 className="font-semibold border-l-4 border-red-500 mb-4 pl-4">Table of Contents</h2>
      <ul className="border-l-4 pl-4 border-gray-200">
        {items && items.map((item, index) => (
          <li
            key={index}
            className={`ml-${(item.style == 'h2' ? 1 : 2) * 2} cursor-pointer
            leading-extra-tight pt-2
            `}
          >
            <a
              href={item._key} // Vincula al mismo ID
              className="text-sm text-gray-900 
              dark:text-gray-400 hover:text-red-500"
              aria-hidden="true"
              tabIndex={-1}
            >
              { item.children ? item.children[0].text : null}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
