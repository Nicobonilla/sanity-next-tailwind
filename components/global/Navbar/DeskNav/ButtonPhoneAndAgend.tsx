'use client';
import React from 'react';
import Link from 'next/link';

const ButtonPhoneAndAgend: React.FC = () => {
  const handleMouseEnter = (section: string) => {
    // Implementa la lógica para manejar el evento onMouseEnter
  };

  const handleMouseLeave = () => {
    // Implementa la lógica para manejar el evento onMouseLeave
  };

  return (
    <li
      key={'contacto'}
      className="group relative"
      onMouseEnter={() => handleMouseEnter('contacto')}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hidden items-center md:flex md:flex-col">
        <Link href={{ pathname: '/fono' }} passHref>
          <span className="font-crimson text-xl font-bold dark:text-white">
            +56 9 8155 9390
          </span>
        </Link>

        <Link href={{ pathname: '/agendar' }} passHref>
          <button className="mt-1 rounded bg-second-500 px-4 py-2 text-white hover:font-bold">
            AGENDAR AHORA
          </button>
        </Link>
      </div>
    </li>
  );
};

export default ButtonPhoneAndAgend;
