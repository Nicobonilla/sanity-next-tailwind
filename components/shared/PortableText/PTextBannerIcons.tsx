import { PortableTextComponents } from 'next-sanity';

export const PTextBannerIcons: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h2 mb-6 text-center uppercase">{children}</h1>
    ),
    normal: ({ children }) => (
      <p className="p3 mb-5 text-justify">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};
