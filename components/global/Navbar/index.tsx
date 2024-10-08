"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { LinksProps } from "@/types";
import MobileNav from "./MobileNav";
import DeskNav from "./DeskNav";
import Logo from "@/components/shared/Logo";

export default function Navbar({ links }: LinksProps) {
  const [scrolling, setScrolling] = useState(false);

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

  return (
    <>
      <div className={`flex fixed inset-x-0 top-0  orgin-top px-10 h-24  z-10 
        ${scrolling && 'bg-menuColor scale-y-80 -translate-y-2'} 
        transition duration-300`}>
        {/* Logo */}

        <div className="flex container h-24 mx-auto">
          <div className={`flex grow-0 left-0 py-4 z-20 justify-center
          ${scrolling && 'translate-y-2'} `}>
            <Logo />
          </div>

          <div className="grow z-10"></div>

          {/* Drop Menu */}
          <MobileNav links={links || []} />
          <DeskNav links={links || []} />
        </div>
      </div>
    </>
  );
};

