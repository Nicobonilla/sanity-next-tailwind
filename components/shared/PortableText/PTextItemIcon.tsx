import { PortableTextComponents } from 'next-sanity';

export const PTextItemIcon: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="h3 mb-3">{children}</h1>,
    normal: ({ children }) => (
      <div className="p3">
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
