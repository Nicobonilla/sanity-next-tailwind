import { PortableTextComponents } from 'next-sanity';

export const PTheroImage: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="pr-10 text-2xl font-extrabold text-white drop-shadow-2xl md:max-w-[600px] md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-robotomono font-light text-white drop-shadow-2xl md:text-3xl">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <div className="mt-5 font-robotomono font-light leading-5 text-white md:text-xl lg:text-2xl">
        <span>{children}</span>
      </div>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="p3 drop-shadow-4xl font-extrabold text-red-700">
        {children}
      </span>
    ),
  },
};

export const PTheroImage2: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <div className="mb-2 font-bitter text-3xl font-medium text-black md:text-5xl lg:mb-6">
        <span>{children}</span>
      </div>
    ),
    h2: ({ children }) => (
      <h1 className="pr-10 font-montserrat text-xl font-medium text-white drop-shadow-2xl md:w-full md:text-2xl lg:text-3xl">
        {children}
      </h1>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="bg-white font-bitter text-2xl font-bold text-red-950 drop-shadow-2xl md:text-3xl lg:text-4xl">
        {children}
      </span>
    ),
  },
};
