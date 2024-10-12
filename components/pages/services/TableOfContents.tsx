"use client";

interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
    level: number;
  }[];
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave al elemento
    }
  };

  return (
    <nav className="scale-y-90">
      <h2 className="font-semibold border-l-4 border-red-500 mb-4 pl-4">Table of Contents</h2>
      <ul className="border-l-4 pl-4 border-gray-200">
        {items.map((item, index) => (
          <li
            key={index}
            className={`ml-${item.level * 2} cursor-pointer
            leading-extra-tight pt-2
            `}
          >
            <a
            href={item.id} // Vincula al mismo ID
            className="text-sm text-gray-900 hover:text-red-500"
            aria-hidden="true"
            tabIndex={-1}
          >
            {item.title}
          </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
