'use client';
import React, { useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import DeskNav from './DeskNav';
import Logo from '@/components/global/Logo';
//import { trackButtonClick } from '@/components/lib/GTMTrackers';

export default function Navbar() {

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={` ${scrolling ? 'fixed h-16 bg-white/90 2xl:h-20' : 'h-20 bg-white 2xl:h-24'
        } inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      {/* Main navbar container */}
      <div
        className={`mx-auto flex h-full max-w-screen-xl items-center justify-between transition-all duration-300 ease-in-out md:px-4 lg:items-end`}
      >
        {/* Logo section */}
        <div
          className={`z-20 ml-2 flex h-full items-center justify-center transition-all duration-700 ease-in-out ${scrolling ? 'scale-95' : 'scale-115 translate-y-1'}`}
        >
          <div
            className="my-auto h-fit"
          //onClick={() => trackButtonClick('logo', 'navbar')}
          >
            <Logo />
          </div>
        </div>

        {/* Mobile contact and nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <MobileNav />
        </div>

        {/* Desktop nav */}
        <div className="hidden place-content-end lg:block">
          <DeskNav />
        </div>
      </div>
    </div>
  );
}