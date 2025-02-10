import clsx from 'clsx';
import { PortableTextComponents } from 'next-sanity';

export const PTextBannerLight: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2
        className={clsx(
          'mb-4 font-robotoslab text-2xl font-light uppercase text-white drop-shadow-sm',
          'lg:text-3xl 2xl:text-3xl'
        )}
      >
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="mx-auto text-center font-crimson text-lg font-light text-white/90">
        {children}
      </p>
    ),
  },
};

export const PTextBannerDark: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="mb-4 font-robotoslab text-2xl font-light uppercase text-white drop-shadow-sm lg:text-3xl">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="mx-auto text-center text-base font-light text-white/90">
        {children}
      </p>
    ),
  },
};

export const PTextBannerDark1: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-crimson text-xl font-semibold uppercase text-red-700">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={clsx(
          'mb-10 font-robotoslab text-2xl font-light text-gray-700 drop-shadow-sm',
          'lg:text-3xl 2xl:text-3xl'
        )}
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="font-robotoslab text-base font-light text-gray-900">
        {children}
      </p>
    ),
  },
};

export const PTextBannerDark2: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-crimson text-xl font-semibold uppercase text-red-700">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-10 font-robotoslab text-2xl font-light text-gray-700 md:mb-0">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="font-robotoslab text-base font-light text-gray-900 md:hidden">
        {children}
      </p>
    ),
  },
};

export const PTextBannerDark3: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="hidden">{children}</h2>,
    h3: ({ children }) => <h3 className="hidden">{children}</h3>,
    normal: ({ children }) => (
      <p className="hidden font-robotoslab text-base font-light text-gray-900 md:block">
        {children}
      </p>
    ),
  },
};
