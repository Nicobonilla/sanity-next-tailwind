import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'}>
      <div className="flex items-center md:px-10">
        <div className="relative size-12 md:size-14">
          {' '}
          {/* Ajusta el tamaño de la imagen si es necesario */}
          <Image src="/bunnwhite.svg" alt="logo" priority fill />
        </div>
        <span className="w-12 font-robotomono font-light leading-4 text-white">
          Follow the rabbit!
        </span>
      </div>
    </Link>
  );
}
