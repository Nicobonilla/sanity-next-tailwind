'use client';
import { useEffect, useState } from "react";
import Logo from "../Logo";
import DeskNav from "./DeskNav";
import MobileNav from "./MobileNav";

export type NavbarProps = {
  logo: string;
  slogan: string;
  pages: { title: string | null; slug: string | null }[];
  unitBusinessList?: { title: string | null; slug: string | null }[] | undefined;
  initialScrolling?: boolean | undefined;
};

export default function NavbarClient({
  logo,
  slogan,
  pages,
  unitBusinessList,
  initialScrolling = false // Valor por defecto false para SSR
}: NavbarProps): JSX.Element {
  // Estado para controlar si estamos en el cliente o en el servidor
  const [isMobile, setIsMobile] = useState(false);
  const [scrolling, setScrolling] = useState(initialScrolling);

  // Este efecto se ejecutará solo en el cliente después de la hidratación
  useEffect(() => {
    // Configurar el detector de tamaño de pantalla
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize(); // Verificar tamaño inicial
    window.addEventListener("resize", checkScreenSize);

    // Configurar el detector de scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Verificar la posición inicial del scroll
    handleScroll();

    // Agregar event listener para scroll
    window.addEventListener('scroll', handleScroll);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={` ${scrolling ? 'fixed h-16 bg-white/90 2xl:h-20' : 'h-20 bg-white 2xl:h-24'
        } inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      {/* Main navbar container */}
      <div
        className={`mx-auto flex h-full max-w-screen-xl items-center justify-between transition-all duration-300 ease-in-out md:px-4 lg:items-end`}
      >
        {/* Logo section */}
        <div
          className={`z-20 ml-2 flex h-full items-center justify-center transition-all duration-700 ease-in-out ${scrolling ? 'scale-95' : 'scale-115 translate-y-1'}`}
        >
          <div
            className="my-auto h-fit"
          //onClick={() => trackButtonClick('logo', 'navbar')}
          >
            <Logo logo={logo} slogan={slogan} />
          </div>
        </div>

        {/* Renderizado condicional basado en si estamos en el cliente y el tamaño de la pantalla */}
        {isMobile ? (
          <div className="flex items-center gap-2 lg:hidden">
            <MobileNav pages={pages} unitBusinessList={unitBusinessList} logo={logo} slogan={slogan} />
          </div>
        ) : (
          // Versión desktop (solo en cliente)
          <div className="hidden place-content-end lg:block">
            <DeskNav pages={pages} unitBusinessList={unitBusinessList} />
          </div>
        )}
      </div>
    </div>
  );
}