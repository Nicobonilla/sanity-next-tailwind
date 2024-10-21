import { PortableTextComponents } from "next-sanity";

// Definición de componentes para PortableText
export const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="h2 group relative">
          {' '}
          {/*text-4xl md:text-3xl lg:text-6xl*/}
          {children}
        </h2>
      ),
      normal: ({ children }) => <p className="p">{children}</p>,
    },
    marks: {
      strong: ({ children }) => (
        <span className="font-extrabold dark:text-gray-300">{children}</span>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="dark:text-gray-400">{children}</ul>
      ),
    },
  };
  