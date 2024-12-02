import { PortableTextComponents } from 'next-sanity';

export const PT4: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h2 relative font-extrabold uppercase dark:text-red-500">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="p2 font-bold">
        {children}
      </h2>
    ),
    normal: ({ children }) => <p className="p2">{children}</p>,
    italic: ({ children }) => (
      <span className="p2 font-extrabold">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

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
  PT4: PortableTextComponents;
};

const PTBanner = { PT1, PT2, PT4 };

export default PTBanner;
