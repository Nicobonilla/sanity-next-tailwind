import { PortableTextComponents } from 'next-sanity';

export const PTextBanner3Features: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="h2 mb-6 text-center uppercase">{children}</h2>
    ),
    normal: ({ children }) => <p className="p2 mb-5">{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};
