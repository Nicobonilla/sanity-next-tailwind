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
      <div className='px-10 bg-menuColor/80 text-white text-xs'>
        <div className="flex flex-col">
          <div className="flex items-center justify-center mt-10">
            <Image src="/logo.svg" width={125} height={125} alt="logo" />
          </div>

          <div className="text-center leading-relaxed py-5">
            Lideres en Gestión Integral de Proyectos de Climatización. Con 25
            años de experiencia entregando seguridad operacional, bienestar y
            eficiencia
          </div>

          <div className="flex flex-col py-5 space-y-3 mb-5">
            <div className="flex justify-center space-x-4 w-2/3 mx-auto">
              <PhoneIcon className="size-5" />
              <div className="mt-1">+56 9811 9390</div>
              <PhoneIcon className="size-5" />
            </div>
            <div className="flex justify-center space-x-4 w-2/3 mx-auto">
              <EnvelopeIcon className="size-5" />
              <div className="mt-1"> sbonilla@abogado.cl</div>
            </div>
            <div className="flex justify-center space-x-4 w-2/3 mx-auto">
              <MapPinIcon className="size-5" />
              <div className="mt-1">Calle oficina 300, San Felipe</div>
            </div>
            <div className="flex justify-center space-x-4 w-2/3 mx-auto">
              <ClockIcon className="size-5" />
              <div className="flex mt-1">
                <div className="mr-2"> Lun a Vie </div>
                <div className="mr-2"> | </div>
                <div >  9:00 - 18:00
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <Map />
          </div>
          <div className="flex justify-center space-x-4 w-2/3 mx-auto">Powered</div>
        </div>
      </div>
    </>
  );
};