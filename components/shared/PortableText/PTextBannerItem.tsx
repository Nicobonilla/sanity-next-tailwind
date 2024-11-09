import { PortableTextComponents } from 'next-sanity';

export const PTextBannerItem: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="h3 mt-4 md:max-w-[280px]">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="p3 mt-2 md:max-w-[300px]">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};
