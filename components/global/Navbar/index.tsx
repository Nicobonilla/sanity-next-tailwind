'use client';
import React, { useState, useEffect } from 'react';
import type { NavProps } from '@/types';
import MobileNav from './MobileNav';
import DeskNav from './DeskNav';
import Logo from '@/components/shared/Logo';

export default function Navbar({ links }: NavProps) {
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
        className={`inset-x-0 top-0 origin-top bg-menuColor transition duration-300 ${
          scrolling && 'fixed -translate-y-2'
        }`}
      >
        {/* Logo */}
        <div className="mx-auto flex h-24 w-[90%]">
          <div
            className={`z-20 flex grow-0 justify-center py-4 ${
              scrolling && 'translate-y-2'
            }`}
          >
            <Logo />
          </div>

          <div className="z-10 grow"></div>

          {/* Drop Menu */}
          <MobileNav links={links || []} />
          <DeskNav links={links || []} />
        </div>
      </div>
    </>
  );
}
