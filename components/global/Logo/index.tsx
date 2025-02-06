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
        <div className="z-50 flex flex-col items-center justify-center font-robotoslab">
          <p
            className={clsx(
              'z-50 text-3xl drop-shadow-2xl',
              'lg:text-5xl',
              'bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 bg-clip-text text-transparent'
            )}
          >
            BONILLA
          </p>
          <p className='-translate-y-1'>Abogados en San Felipe</p>
          {/* Mostrar el sufijo opcional `.cl` */}
          {false && (
            <span className="ml-1 text-lg font-semibold text-white">.cl</span>
          )}
        </div>
      </div>
    </Link>
  );
}
