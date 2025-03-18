import Link from 'next/link';

export default function Logo({ logo, slogan }: { logo: string; slogan: string }) {
  return (
    <Link href={{ pathname: '/' }}>
      <div className="flex h-fit w-[210px] items-center justify-center">
        {/* Logo SVG opcional, puedes cambiar `false` a `true` si deseas mostrarlo */}
        {/* Texto del Logo */}
        <div className="z-40 flex flex-col text-center">
          <div
            className={'flex font-crimson uppercase drop-shadow-xl gap-1 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-700 bg-clip-text'}
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
        </div>
      </div>
    </Link>
  );
}