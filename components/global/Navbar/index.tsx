'use client';
import React, { useState, useEffect } from 'react';
import MobileNav from './MobileNav';
import DeskNav from './DeskNav';
import Logo from '@/components/shared/Logo';
import ThemeToggle from './ThemeToggle';

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
    <>
      <div
        className={`inset-x-0 top-0 origin-top bg-bodydark transition duration-300 ${
          scrolling && 'fixed -translate-y-2'
        }`}
      >
        {/* Logo */}
        <div className="mx-auto flex h-24 w-[90%] md:w-full md:px-4 lg:max-w-screen-xl">
          <div
            className={`z-20 flex grow-0 justify-center py-4 ${
              scrolling && 'translate-y-2'
            }`}
          >
            <Logo />
          </div>

          <div className="z-10 flex grow items-center justify-end">
            <div className="pr-10">
              <ThemeToggle />
            </div>
          </div>

          {/* Drop Menu */}
          <MobileNav />
          <DeskNav />
        </div>
      </div>
    </>
  );
}
