import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon } from '@sanity/icons'
import { NavProps } from "@/types";

export default function DropDownSlow({ links }: NavProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

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
            <nav >
                <div
                    className={`fixed h-[100vh] w-[100vw]  bg-black/30 right-0 z-10 
                        ${isMenuOpen ? "ease-in" : "-translate-y-full ease-out"
                        }`}
                ></div>
                <ul
                    className={`
                        absolute py-5 origin-top right-0 top-full w-[100vw] 
                        bg-menuColor shadow-lg 
                        transition z-10 duration-300 transition-transform ease-in-out 
                        ${!isMenuOpen && "scale-y-0"}
                        `}
                >

                    {
                        links && links.map((section, index) => (
                            <Link key={index} href={section.href} passHref>
                                <li
                                    className={`
                                        relative origin-top flex bg-menuColor
                                        text-white text-xs uppercase  
                                        justify-center py-3 rounded 
                                        transition-transform ease-out 
                                        transition duration-200 delay-300
                                        hover:text-gray-400 
                                        ${!isMenuOpen &&
                                        "scale-0 " +
                                        (index === 0
                                            ? "-translate-y-[60%]"
                                            : index === 1
                                                ? "-translate-y-[150%]"
                                                : index === 2
                                                    ? "-translate-y-[300%]"
                                                    : "-translate-y-[400%]")
                                        }`
                                    }
                                >
                                    {section.section}
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </nav>
            {/* Mobile Menu Toggle */}
            <div className="grow-0 h-full right-0 lg:hidden">
                {/*<NavbarDesk links={links} />*/}
                <div className="relative flex flex-col grid text-white cursor-pointer h-full z-20">
                    <div
                        onClick={toggleMenu}
                        className="flex items-center justify-center"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? (
                            <CloseIcon className="size-10" />
                        ) : (
                            <MenuIcon className="size-10" />
                        )}
                    </div>
                </div>
            </div>
        </>
    )

};