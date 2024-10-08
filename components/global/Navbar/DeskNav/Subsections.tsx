'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Menu as Menu2, X, MoreHorizontal, User } from 'lucide-react';
import { Links, NavProps } from '@/types';
import Link from 'next/link';

const Menu: React.FC<NavProps> = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-sans hidden lg:block">
        <div className="container flex items-center justify-between h-full">
          <nav className="hidden md:flex  space-x-10 lg:space-x-28  ">
            {
            links && links.map(link => (
              <div 
              key={link.section} 
              className="relative group">
                <Link 
                href={link.href} 
                passHref>
                  <button className="inline-flex items-center h-24
                  text-white text-base font-extralight 
                  group-hover:font-light  justify-center
                  ">
                    {link.section}
                  </button>
                </Link>
                
                {link.subsections && link.subsections.length > 0 && (
                  <div className="absolute hidden 
                  left-0 z-10 w-screen
                  bg-white shadow-lg 
                  group-hover:block">

                    {link.subsections.map(({ section, href }, subIndex) => (
                      <Link key={section} 
                      href={href} 
                      passHref
                      className={`block px-4 py-4 
                          text-xs  text-gray-700 
                          hover:bg-[#6f97d9] hover:text-white 
                          ${
                          subIndex === 0 ? 
                          "border-t border-blue-500" : 
                          "border-t border-gray-500"
                          }`}
                        >
                          {section}
                      </Link>
                    ))}

                  </div>
                )}

              </div>
            ))
            
            }
            <button className="text-white hover:text-gray-800">
              <User className="h-6 w-6" />
            </button>
          </nav>  
          <div className="hidden md:flex md:flex-col items-center space-x-4">
            <span className="text-white">866-323-7529</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              AGENDAR AHORA
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu2 className="h-6 w-6" />}
          </button>
        </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {links.map(link => (
              <Link  
              key={link.section} 
              href={link.href} 
              className="text-white hover:text-gray-800"
              passHref>
                {link.section}
              </Link>
            ))}
            <span className="text-white">866-323-7529</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
              PROGRAMAR AHORA
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Menu;
