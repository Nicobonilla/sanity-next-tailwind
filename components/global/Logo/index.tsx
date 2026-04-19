'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  logo?: string | null;
  slogan?: string | null;
};

export default function Logo({ logo, slogan }: LogoProps) {
  if (!logo) {
    return null;
  }

  return (
    <Link href={{ pathname: '/' }}>
      <div className="flex h-fit w-[210px] items-center justify-center">
        {false && (
          <div className="relative size-12 md:size-14">
            <Image src="/bunnwhite.svg" alt="logo" priority fill />
          </div>
        )}

        <div className="z-50 flex flex-col text-center">
          <div
            className={clsx(
              'z-50 flex gap-1 font-crimson uppercase drop-shadow-xl',
              'bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-700 bg-clip-text'
            )}
          >
            {logo.split(' ').map((word, i) => (
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
          {false && (
            <span className="ml-1 text-lg font-semibold text-white">.cl</span>
          )}
        </div>
      </div>
    </Link>
  );
}
