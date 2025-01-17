'use client';
import { useScrollContext } from '@/context/ScrollContext';
import { useTheme } from '@/context/ThemeContext';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  const { scrolling } = useScrollContext();
  const { isDarkMode } = useTheme();
  return (
    <Link href={'/'}>
      <div className="flex h-full items-center justify-center">
        {/* Logo SVG opcional, puedes cambiar `false` a `true` si deseas mostrarlo */}
        {false && (
          <div className="relative size-12 md:size-14">
            <Image src="/bunnwhite.svg" alt="logo" priority fill />
          </div>
        )}

        {/* Texto del Logo */}
        <div className="z-50 flex items-center justify-center font-bitter">
          <h1
            className={clsx(
              'z-50 text-3xl font-thin drop-shadow-2xl',
              'lg:-translate-y-3 lg:text-7xl',
              !scrolling && 'text-4xl md:text-7xl',
              // Only apply white text when both conditions are true
              !scrolling
                ? 'text-white'
                : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent'
            )}
          >
            SBonilla
          </h1>
          {/* Mostrar el sufijo opcional `.cl` */}
          {false && (
            <span className="ml-1 text-lg font-semibold text-white">.cl</span>
          )}
        </div>
      </div>
    </Link>
  );
}
