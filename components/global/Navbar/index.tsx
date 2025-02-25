'use client';
import React from 'react';
import MobileNav from './MobileNav';
import DeskNav from './DeskNav';
import Logo from '@/components/global/Logo';
import {
  ScrollContextProvider,
  useScrollContext,
} from '@/context/ScrollContext';
import Contacto from './Contacto';

const NavbarContent = () => {
  const { scrolling } = useScrollContext();

  return (
    <div
      className={` ${
        scrolling ? 'fixed h-16 bg-white/90 2xl:h-20' : 'h-20 bg-white 2xl:h-24'
      } inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      {false && (
        <div className="z-50 hidden w-full justify-end px-4">
          <Contacto />
          <button className="p-2">
            <h1
              className={`z-50 bg-gradient-to-r ${
                scrolling ? 'from-red-500' : 'from-gray-600'
              } to-gray-700 bg-clip-text px-5 font-light text-transparent`}
            >
              Hablemos!
            </h1>
          </button>
        </div>
      )}

      {/* Main navbar container */}
      <div
        className={`mx-auto flex h-full max-w-screen-xl items-center justify-between transition-all duration-300 ease-in-out md:px-4 lg:items-end`}
      >
        {/* Logo section */}
        <div
          className={`z-20 ml-2 flex h-full items-center justify-center transition-all duration-700 ease-in-out ${scrolling ? 'scale-95' : 'scale-115 translate-y-1'}`}
        >
          <div className="my-auto h-fit">
            <Logo />
          </div>
        </div>

        {/* Mobile contact and nav */}
        <div className="flex items-center gap-2 lg:hidden">
          {false && <Contacto />}
          <MobileNav />
        </div>

        {/* Desktop nav */}
        <div className="hidden place-content-end lg:block">
          <DeskNav />
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  return (
    <ScrollContextProvider>
      <NavbarContent />
    </ScrollContextProvider>
  );
}
