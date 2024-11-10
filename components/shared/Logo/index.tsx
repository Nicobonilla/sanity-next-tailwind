'use client';
import { useScrollContext } from '@/context/ScrollContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  const { scrolling } = useScrollContext();

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
            className={`z-50 font-extrabold ${
              scrolling
                ? 'bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-3xl text-transparent lg:text-5xl'
                : 'text-4xl text-white md:text-7xl'
            }`}
          >
            ON
          </h1>
          <h1
            className={`z-50 font-extrabold ${
              scrolling
                ? 'bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-3xl text-transparent lg:text-5xl'
                : 'text-4xl text-white md:text-7xl'
            }`}
          >
            IT
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
