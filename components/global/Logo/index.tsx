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
      <div className="flex h-fit w-[210px] items-center justify-center">
        {/* Logo SVG opcional, puedes cambiar `false` a `true` si deseas mostrarlo */}
        {false && (
          <div className="relative size-12 md:size-14">
            <Image src="/bunnwhite.svg" alt="logo" priority fill />
          </div>
        )}

        {/* Texto del Logo */}
        <div className="z-50 flex flex-col text-center">
          <div
            className={clsx(
              'z-50 flex-row font-crimson drop-shadow-2xl',
              'lg:text-4xl',
              'bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-700 bg-clip-text'
            )}
          >
            <span className="text-2xl font-thin">SEBASTÍAN BONILLA</span>
          </div>
          <p className="-translate-y-1 font-robotoslab text-xs uppercase">
            Asesoría Legal y Jurídica
          </p>
          {/*Mostrar el sufijo opcional `.cl` */}
          {false && (
            <span className="ml-1 text-lg font-semibold text-white">.cl</span>
          )}
        </div>
      </div>
    </Link>
  );
}
