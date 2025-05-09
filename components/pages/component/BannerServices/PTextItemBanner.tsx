import { PortableTextComponents } from 'next-sanity';

export const PT6: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <p className="font-sm mb-1 text-left font-bitter font-semibold text-red-600">
        {children}
      </p>
    ),
    normal: ({ children }) => (
      <p className="font-monserrat text-justify text-sm leading-none">
        {children}
      </p>
    ),
  },
};

export const PT1: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <span className="mr-2 text-justify font-montserrat text-sm font-extrabold text-red-500">
        {children}
      </span>
    ),
    normal: ({ children }) => (
      <span className="font-monserrat text-justify text-sm leading-none">
        {children}
      </span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

export const PT4: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <span className="mr-2 text-justify font-montserrat text-sm font-extrabold">
        {children}
      </span>
    ),
    normal: ({ children }) => (
      <span className="font-monserrat text-justify text-sm leading-none">
        {children}
      </span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

export const PT3: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="h3 mx-auto mb-2 items-center justify-center font-montserrat text-sm font-extrabold">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="p3 pb-5 text-justify font-crimson text-base leading-none">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

export const PT2: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="h3 mx-auto mb-2 items-center justify-center font-montserrat text-sm font-extrabold">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="p3 px-5 pb-5 text-center font-crimson text-base leading-none">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-500">{children}</span>
    ),
  },
};

export type PTItemtype = Record<
  'PT1' | 'PT2' | 'PT3' | 'PT4' | 'PT6',
  PortableTextComponents
>;

const PTItemBanner = { PT1, PT2, PT3, PT4, PT6 };

export default PTItemBanner;
