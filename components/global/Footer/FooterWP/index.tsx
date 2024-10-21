"use client";
import Map from "./Map";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Logo from "@/components/shared/Logo";

export default function Footer() {
  return (
    <>
      <div className='bg-menuColor2/80 text-white text-x p-2'>
        <div className="flex flex-col lg:flex-row justify-center my-auto container mx-auto">
          
          <div className="flex flex-col md:flex-row my-auto" >
            <div className="md:w-1/2 flex flex-col">
              <div className="flex items-center justify-center mt-10">
                <Logo/>
              </div>

              <div className="text-center flex items-center leading-relaxed py-5 mx-5 text-white">
                Asesoría legal Lideres en Gestión Integral de Proyectos de Climatización. Con 25
                años de experiencia entregando seguridad operacional, bienestar y
                eficiencia
              </div>
            </div>
            
            <div className="hidden lg:block px-5  my-auto mx-10 lg:text-md lg:w-1/4">
              Asesoría Legal, especialistas en derecho familiar. Abogado con basta experiencia en en materia familiar
              </div>

            <div className="flex flex-col items-center py-4
            space-y-1 lg:space-y-1 lg:text-md lg:w-1/4">
              <div className="flex justify-center space-x-4 "> {/*md:justify-start*/}
                <PhoneIcon className="size-5" />
                <div className="mt-1">+56 9811 9390</div>
                <PhoneIcon className="size-5" />
              </div>
              <div className="flex justify-center 
              space-x-4 lg:space-x-3 mx-auto">
                <EnvelopeIcon className="size-5" />
                <div className="mt-1"> contacto@asesorialegalsanfelipe.cl</div>
              </div>
              <div className="flex justify-center 
              space-x-4 lg:space-x-3  mx-auto ">
                <MapPinIcon className="size-5" />
                <div className="mt-1">Calle oficina 300, San Felipe</div>
              </div>
              <div className="flex justify-center 
              mx-auto">
                <ClockIcon className="size-5 mr-4 lg:mr-2" />
                <div className="flex mt-1  space-x-4 lg:space-x-2 ">
                  <div className=""> Lun a Vie </div>
                  <div className=""> | </div>
                  <div >  9:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:my-auto lg:w-1/3 py-5 lg:py-0 lg:pr-5">
            <Map />
          </div>
        </div>
        
      </div>
      <div className="flex items-center  bg-body-dark justify-center text-white lg:p-2">Powered</div>
    </>
  );
};