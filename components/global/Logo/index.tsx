'use client';
import { useSanityContext } from '@/context/SanityContext';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  const { settings } = useSanityContext();
  if (!settings) {
    return null;
  }
  const { logo, slogan } = settings;
  return (
    <Link href={{ pathname: '/' }}>
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
              'z-50 flex font-crimson uppercase drop-shadow-xl gap-1',
              'bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-700 bg-clip-text'
            )}
          >
            {logo?.split(' ').map((word, i) => (
              <span key={i}>
                <span className="text-2xl xl:text-3xl">{word[0]}</span>
                <span className="text-xl xl:text-2xl">{word.slice(1)}</span>
                {i < logo.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
          <p className="-translate-y-1 font-robotoslab text-xs uppercase xl:text-sm">
            {slogan}
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
