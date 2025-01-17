'use client';
import React from 'react';
import MobileNav from './MobileNav';
import DeskNav from './DeskNav';
import Logo from '@/components/shared/Logo';
import ThemeToggle from './ThemeToggle';
import { FaWhatsapp } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import Link from 'next/link';
import {
  ScrollContextProvider,
  useScrollContext,
} from '@/context/ScrollContext';

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
  const colorBg2 = scrolling ? colorScroll.white : 'bg-black/20';
  const colorText = scrolling ? 'gray' : 'white';

  const Contacto = () => {
    return (
      <div
        className={`front-normal flex flex-row gap-8 pr-4 text-sm ${scrolling ? 'text-gray-500' : 'text-white'} `}
      >
        <button>
          <Link
            href={{
              pathname: '/email-contacto',
            }}
            passHref
          >
            <IoIosMail size={24} color={colorText} />
          </Link>
        </button>

        <button>
          <Link
            href={{
              pathname: '/whatsapp',
            }}
            passHref
          >
            <FaWhatsapp size={24} color={colorText} />
          </Link>
        </button>
      </div>
    );
  };

  return (
    <div
      className={
        'fixed inset-x-0 top-0 z-50 items-start transition-all duration-300 ease-in-out'
      }
    >
      <div
        className={`h-10 ${colorBg2} flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="z-50 hidden w-full justify-end px-4 lg:flex">
          <Contacto />
          <button className="p-2">
            <h1
              className={`z-50 bg-gradient-to-r ${scrolling ? 'from-red-500' : 'from-gray-600'} to-gray-700 bg-clip-text px-5 font-light text-transparent`}
            >
              Hablemos!
            </h1>
          </button>
        </div>
        <div
          className={`flex h-16 w-full origin-top ${colorBg} transition-all duration-300 ease-in-out md:px-4 ${!scrolling && 'lg:translate-y-4'}`}
        >
          <div className={`z-20 flex grow-0 justify-center p-2`}>
            <Logo />
          </div>
          <div className={`z-10 flex grow items-center justify-end`}></div>

          <div className="my-auto flex items-center justify-end pr-3 lg:hidden">
            <Contacto />
          </div>

          <MobileNav />
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
