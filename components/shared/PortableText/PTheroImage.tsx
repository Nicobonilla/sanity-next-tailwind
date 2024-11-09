import { PortableTextComponents } from 'next-sanity';

export const PTheroImage: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="h1 text-4xl font-extrabold text-white drop-shadow-2xl md:text-5xl">
        {children}
      </h1>
    ),
    normal: ({ children }) => (
      <div className="mt-5 font-robotomono font-light leading-5 text-white md:text-xl lg:text-2xl">
        <span>{children}</span>
      </div>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 font-bold text-red-500">{children}</span>
    ),
  },
};
