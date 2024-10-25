import { PortableTextComponents } from 'next-sanity';

export const PTextBanner: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="h2 relative">{children}</h2>,
    normal: ({ children }) => <p className="p2">{children}</p>,
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
