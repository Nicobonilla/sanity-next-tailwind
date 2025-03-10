'use client';
import { ScrollContextProvider } from '@/context/ScrollContext';
import Logo from '../Logo';
export default function Footer() {
  return (
    <>
      <ScrollContextProvider>
      <div className="z-40 bg-bodydark py-12 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 md:w-1/2">
        <div className="mb-4">
          <Logo />
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
      </ScrollContextProvider>
    </>
  );
}
