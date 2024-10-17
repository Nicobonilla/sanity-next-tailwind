'use client'

import { useState } from 'react'
import { Menu as Menu2, X, User } from 'lucide-react'
import { NavProps } from '@/types'
import Link from 'next/link'

export default function SubsectionsFullWidth({ links }: NavProps) {

  const [activeLink, setActiveLink] = useState<string | null>(null)
  const handleMouseEnter = (section: string) => {
    setActiveLink(section)
  }

  const handleMouseLeave = () => {
    setActiveLink(null)
  }

  return (
    <nav className="font-sans hidden lg:block static">
      <ul className="flex items-center justify-between h-24 
      text-white    space-x-2 xl:space-x-16 2xl:space-x-28">
        {links?.map(link => (
          <li
            key={link.section}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(link.section)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={link.href} passHref>
              <span className="inline-flex items-center h-24 px-4 text-white text-base font-extralight hover:font-light justify-center">
                {link.section}
              </span>
            </Link>
          </li>
        ))
        }


        <li
          key={'contacto'}
          className="relative group"
          onMouseEnter={() => handleMouseEnter('contacto')}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={{ pathname: '/login' }} passHref>
            <span className="inline-flex items-center h-24 px-4 text-white text-base font-extralight hover:font-light justify-center">
              <User />
            </span>
          </Link>
        </li>
 
        <li
          key={'contacto'}
          className="relative group"
          onMouseEnter={() => handleMouseEnter('contacto')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hidden md:flex md:flex-col items-center">
            <Link href={{ pathname: '/fono' }} passHref>
              <span className="text-white">+56 9 8155 9390</span>
            </Link>

            <Link href={{ pathname: '/agendar' }} passHref >
              <button className="bg-second-500 text-white
              px-4 py-2 mt-1 rounded 
              hover:bg-second-700 
              ">AGENDAR AHORA</button>
            </Link>
          </div>
        </li>


      </ul>

      {/* Subsections */}
      {links?.map(link => (
        link.subsections && (link.subsections?.length > 0 && activeLink === link.section && (
          <div
            key={link.section}
            className="absolute left-0 w-screen bg-white 
          shadow-lg transition-opacity duration-1000 ease-in-out z-50"
            onMouseEnter={() => handleMouseEnter(link.section)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto max-w-screen-lg p-6">
              <div className="grid grid-cols-4">
                <div className="col-span-2
                flex items-center space-x-4 mb-4">
                  <Menu2 className="h-6 w-6 text-gray-600" />
                  <span className="font-semibold text-gray-800">{link.section}</span>
                </div>
                <div className="col-span-2 
                flex items-center space-x-4 mb-4">
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="font-semibold text-gray-800">User Section</span>
                </div>
                {/* Subsections */}
                {link.subsections.map(({ section, href }) => (
                  <Link
                    key={section}
                    href={href}
                    passHref
                    className="font-light pr-4 text-sm text-black hover:bg-[#6f97d9] hover:text-white transition-all duration-300 rounded"
                  >
                    {section}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))

      ))}

    </nav>

  )
}