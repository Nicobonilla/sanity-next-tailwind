import { PortableTextComponents } from 'next-sanity';
// Componente de PortableText con estilos personalizados

export const PT5: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h2 relative font-extrabold uppercase dark:text-red-500">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="front-monserrat font-monserrat mt-5 text-justify font-bold uppercase dark:text-red-500">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="font-menserrat pr-20 text-sm">{children}</p>
    ),
  },
};

// PT para componente COMO LO HACEMOS?
export const PT4: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h2 relative font-extrabold uppercase dark:text-red-500">
        {children}
      </h1>
    ),
    h2: ({ children }) => <h2 className="p2 font-bold">{children}</h2>,
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

export const PT3: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h2 mx-auto max-w-screen-md justify-center px-2 uppercase">
        {children}
      </h1>
    ),
    normal: ({ children }) => (
      <p className="p3 mx-20 mb-10 mt-5 md:m-0 md:max-w-80 md:text-right">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-extrabold dark:text-red-600">{children}</span>
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

export type PTBannerType = Record<
  'PT1' | 'PT2' | 'PT4' | 'PT5',
  PortableTextComponents
>;

const PTBanner = { PT1, PT2, PT3, PT4, PT5 };

export default PTBanner;
