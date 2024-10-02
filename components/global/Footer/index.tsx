"use client";
import Map from "./Map";
import Image from 'next/image'
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <>
      <div className='bg-menuColor2/80 text-white text-x p-2'>
        <div className="flex flex-col lg:flex-row justify-center my-auto">
          
          <div className="flex flex-col md:flex-row my-auto" >
            <div className="md:w-1/2 flex flex-col">
              <div className="flex items-center justify-center mt-10">
                <Image src="/logo.svg" width={125} height={125} alt="logo" />
              </div>

              <div className="text-center leading-relaxed py-5 px-5 text-white prose">
                Asesoría legal Lideres en Gestión Integral de Proyectos de Climatización. Con 25
                años de experiencia entregando seguridad operacional, bienestar y
                eficiencia
              </div>
            </div>
            
            <div className="flex">
            <div className="hidden lg:block px-5 flex items-center my-auto">
              Asesoría Legal, especialistas en derecho familiar. Abogado con basta experiencia en en materia familiar
              </div>
              </div>

            <div className="md:w-1/2 flex flex-col py-4 my-auto space-y-3 lg:text-md">
              <div className="flex justify-center space-x-4"> {/*md:justify-start*/}
                <PhoneIcon className="size-5" />
                <div className="mt-1">+56 9811 9390</div>
                <PhoneIcon className="size-5" />
              </div>
              <div className="flex justify-center space-x-4 w-2/3 mx-auto">
                <EnvelopeIcon className="size-5" />
                <div className="mt-1"> contacto@asesorialegalsanfelipe.cl</div>
              </div>
              <div className="flex justify-center space-x-4 w-2/3 mx-auto ">
                <MapPinIcon className="size-5" />
                <div className="mt-1">Calle oficina 300, San Felipe</div>
              </div>
              <div className="flex justify-center space-x-4 w-2/3 mx-auto">
                <ClockIcon className="size-5" />
                <div className="flex mt-1  space-x-4 ">
                  <div className=""> Lun a Vie </div>
                  <div className=""> | </div>
                  <div >  9:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:my-auto lg:w-1/3 py-5 lg:pr-4">
            <Map />
          </div>
        </div>
        
      </div>
      <div className="flex items-center  bg-menuColor justify-center text-white lg:p-2">Powered</div>
    </>
  );
};