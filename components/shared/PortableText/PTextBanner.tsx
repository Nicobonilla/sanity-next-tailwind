import { PortableTextComponents } from 'next-sanity';

export const PT1: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="h2 relative">{children}</h2>,
    normal: ({ children }) => <p className="p2">{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="dark:text-gray-400">{children}</ul>
    ),
  },
};

export const PT2: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="h2 relative">{children}</h2>,
    normal: ({ children }) => (
      <p className="text-justify font-montserrat text-sm font-normal leading-5 text-slate-700 dark:text-gray-200 lg:font-medium">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="dark:text-gray-400">{children}</ul>
    ),
  },
};

export type PTtype = {
  PT1: PortableTextComponents;
  PT2: PortableTextComponents;
};

const PTBanner = { PT1, PT2 };

export default PTBanner;
