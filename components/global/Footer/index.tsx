import Logo from '../Logo';
import type { NavbarProps } from '../Navbar';
export default function Footer({ logo, slogan }: Omit<NavbarProps, 'pages' | 'unitBusinessList'>) {
  return (
    <>
      <div className="z-30 bg-bodydark py-12 text-white">
        <div className="container mx-auto flex flex-col items-center justify-center px-6 md:w-1/2">
          <div className="mb-4">
            <Logo logo={logo} slogan={slogan} />
          </div>
          <p className="max-w-[450px] text-center font-montserrat text-sm md:text-base">
            Asesoría Legal y Judicial en San Felipe de Valparaíso, Chile. Expertos
            en Derecho Familiar e Inmobiliario
          </p>
        </div>
      </div>
      {/*<div className="flex items-center justify-center bg-bodydark text-white lg:p-2">
          Powered
        </div> */}
    </>
  );
}
