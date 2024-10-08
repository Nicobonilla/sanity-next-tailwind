'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X as CloseIcon, Menu as MenuIcon, ChevronDown, ChevronUp, PhoneIcon, User } from 'lucide-react'
import { NavProps } from '@/types'
import Image from 'next/image'
import Logo from '@/components/shared/Logo'

const MobileNavDrawer: React.FC<NavProps> = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen((prev) => !prev)
  }

  const toggleSection = (section: string, e: React.MouseEvent) => {
    e.stopPropagation() // Detener la propagación del clic para evitar el cierre del drawer
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.mobile-nav-drawer')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      window.addEventListener('click', closeMenu)
      document.body.style.overflow = 'hidden' // Disable scroll
    } else {
      document.body.style.overflow = '' // Re-enable scroll
    }

    return () => {
      window.removeEventListener('click', closeMenu)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="grow-0 h-full right-0 lg:hidden z-50">
      <div className="relative flex flex-col grid text-white cursor-pointer h-full z-50">
        <div
          onClick={toggleMenu}
          className="flex items-center justify-center"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <CloseIcon className="size-8" />
          ) : (
            <MenuIcon className="size-8" />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}  // Close menu on overlay click
          ></div>

          {/* Mobile Menu Drawer */}
          <div
            id="mobile-menu"
            className={`fixed top-0 right-0 h-screen 
              bg-drawerColor shadow-lg transform z-50 
              mobile-nav-drawer overflow-y-auto 
              transition-transform duration-300 ease-in-out 
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              } w-[70%] sm:w-[60%] md:w-[40%]`}
          >

            <nav className="p-6">
              <div className="flex h-20 grow-0 my-auto justify-center z-20 mb-10">
                <Logo />
              </div>
              <ul className="divide-y divide-dividerDrawer items-center">
                {
                  links.map((link) => (
                    <li key={link.section}>
                      <button
                        onClick={(e) => toggleSection(link.section, e)}  // Add event here
                        className="flex items-center justify-between 
                            w-full h-full py-3
                            text-gray-300 
                            hover:text-white focus:outline-none"
                      >
                        {link.section}
                        {link.subsections && link.subsections?.length > 0 && (
                          expandedSections.includes(link.section) ?
                            <ChevronUp /> :
                            <ChevronDown />
                        )}
                      </button>
                      {
                        expandedSections.includes(link.section) && (
                          <ul className="pl-4 space-y-2">
                            {
                              link.subsections && link.subsections.map((sublink) => (
                                <li key={sublink.section}>
                                  <Link href={sublink.href}>
                                    <span className="block font-thin text-gray-300
                                      hover:font-normal hover:text-white">
                                      {sublink.section}
                                    </span>
                                  </Link>
                                </li>
                              ))
                            }
                          </ul>
                        )}
                    </li>
                  ))}
              </ul>
              <div className="flex flex-col space-y-4 pt-10 text-[14px]">
                <button className="text-gray-300 bg-second flex px-4 py-2 rounded justify-center">
                  <User className="size-5 mr-3" />
                  PORTAL CLIENTES
                </button>
                <button className="text-gray-600 bg-white flex px-4 py-2 rounded justify-center">
                  <PhoneIcon className="size-5 mr-3" />
                  LLÁMENOS AHORA
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileNavDrawer
