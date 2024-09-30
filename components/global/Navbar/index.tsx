"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {MenuIcon, CloseIcon} from '@sanity/icons'
type Links = {
  id: number;
  name: string;
  href: string;
};

const links: Links[] = [
  { id: 1, name: "Nosotros", href: "/nosotros" },
  { id: 2, name: "Climatización HVAC", href: "/climatizacion_hvac" },
  { id: 3, name: "Gestión de Proyectos", href: "/gestion_de_proyectos" },
  { id: 4, name: "Debes Saber", href: "/debes-saber-abogado-familiar" },
];
// h-20 to h-17
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".cursor-pointer")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("click", closeMenu);
    }

    return () => window.removeEventListener("click", closeMenu);
  }, [isMenuOpen]); // Dependencias para que se ejecute cada vez que isMenuOpen cambie.

  return (
    <>
      <div className={`flex fixed px-10 h-20 inset-x-0 top-0  orgin-top z-10 
        ${scrolling ? 'bg-menuColor scale-y-90 -translate-y-1' : 'bg-menuColor/80'} 
        transition duration-300`}>
        {/* Logo */}
        <div className="grow-0 my-auto left-0 z-20">
          <Image src="/logo.svg" width={64} height={125} alt="logo" />
        </div>

        <div className="grow z-10"></div>

        {/* Drop Menu */}
        <nav >
          <div
            className={`fixed h-[100vh] w-[100vw]  bg-black/30 right-0 z-10 ${
              isMenuOpen ? "ease-in" : "-translate-y-full ease-out"
            }`}
          ></div>
          <ul
            className={`absolute py-5 origin-top right-0 top-full w-[100vw] bg-menuColor shadow-lg 
              transition z-10 duration-300 transition-transform ease-in-out ${
                !isMenuOpen && "scale-y-0"
              }`}
          >
            {links.map((section, index) => (
              <Link key={index} href={"/web"+section.href} passHref>
                {" "}
                <li
                  className={`relative flex text-white origin-top bg-menuColor 
                    justify-center py-3 rounded transition-transform ease-out 
                    text-xs uppercase hover:text-gray-400 transition duration-200 delay-300 ${
                    !isMenuOpen &&
                    "scale-0 " +
                      (index === 0
                        ? "-translate-y-[60%]"
                        : index === 1
                        ? "-translate-y-[150%]"
                        : index === 2
                        ? "-translate-y-[300%]"
                        : "-translate-y-[400%]")
                  }`}
                >
                  {section.name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="grow-0 h-full right-0">
          {/*<NavbarDesk links={links} />*/}
          <div className="relative flex flex-col grid text-white cursor-pointer h-full z-20 lg:hidden">
            <div
              onClick={toggleMenu}
              className="flex items-center justify-center"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
               {isMenuOpen ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

