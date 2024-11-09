'use client';
import Map from './Map';
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import Logo from '@/components/shared/Logo';

export default function WPlike({ scrolling }: { scrolling: boolean }) {
  return (
    <>
      <div className="text-x bg-menuColor2/80 p-2 text-white">
        <div className="container m-auto flex flex-col justify-center lg:flex-row">
          <div className="my-auto flex flex-col md:flex-row">
            <div className="flex flex-col md:w-1/2">
              <div className="mt-10 flex items-center justify-center">
                <Logo scrolling />
              </div>

              <div className="mx-5 flex items-center py-5 text-center leading-relaxed text-white">
                Asesoría legal Lideres en Gestión Integral de Proyectos de
                Climatización. Con 25 años de experiencia entregando seguridad
                operacional, bienestar y eficiencia
              </div>
            </div>

            <div className="lg:text-md mx-10 my-auto hidden px-5 lg:block lg:w-1/4">
              Asesoría Legal, especialistas en derecho familiar. Abogado con
              basta experiencia en en materia familiar
            </div>

            <div className="lg:text-md flex flex-col items-center space-y-1 py-4 lg:w-1/4 lg:space-y-1">
              <div className="flex justify-center space-x-4">
                {' '}
                {/*md:justify-start*/}
                <PhoneIcon className="size-5" />
                <div className="mt-1">+56 9811 9390</div>
                <PhoneIcon className="size-5" />
              </div>
              <div className="mx-auto flex justify-center space-x-4 lg:space-x-3">
                <EnvelopeIcon className="size-5" />
                <div className="mt-1"> contacto@asesorialegalsanfelipe.cl</div>
              </div>
              <div className="mx-auto flex justify-center space-x-4 lg:space-x-3">
                <MapPinIcon className="size-5" />
                <div className="mt-1">Calle oficina 300, San Felipe</div>
              </div>
              <div className="mx-auto flex justify-center">
                <ClockIcon className="mr-4 size-5 lg:mr-2" />
                <div className="mt-1 flex space-x-4 lg:space-x-2">
                  <div className=""> Lun a Vie </div>
                  <div className=""> | </div>
                  <div> 9:00 - 18:00</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-5 lg:my-auto lg:w-1/3 lg:py-0 lg:pr-5">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
