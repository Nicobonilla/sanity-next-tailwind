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

  const colorScroll = {
    gradient:
      'bg-gradient-to-r from-red-500 from-10% via-red-600 via-85% to-transparent to-100%',
    gradient2:
      'via-85 bg-gradient-to-br from-red-500 from-10% via-red-600 to-transparent to-100%',
    white: 'bg-white/90',
  };
  const colorBg = scrolling ? colorScroll.white : 'transparent';
  return (
    <div
      className={`${
        scrolling ? 'fixed h-16 bg-white/80' : 'h-20 bg-white'
      } inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
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

      {/* Main navbar container */}
      <div
        className={`flex w-full items-center justify-between transition-all duration-1000 ease-in-out md:px-4 ${
          scrolling && 'lg:-translate-y-3'
        }`}
      >
        {/* Logo section */}
        <div
          className={`z-20 flex items-center p-2 transition-all duration-700 ease-in-out ${scrolling && 'scale-75'}`}
        >
          <Logo />
        </div>

        {/* Mobile contact and nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <Contacto />
          <MobileNav />
        </div>

        {/* Desktop nav */}
        <DeskNav />
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
