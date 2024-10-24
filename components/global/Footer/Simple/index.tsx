'use client';
import Logo from '@/components/shared/Logo';

export default function WPlike() {
  return (
    <>
      <div className="text-x bg-bodydark p-2 text-white">
        <div className="container mx-auto my-auto flex flex-col justify-center lg:flex-row">
          <div className="my-auto flex flex-col md:flex-row">
            <div className="flex flex-col md:w-1/2 md:flex-row">
              <div className="mt-10 flex items-center justify-center md:mt-0">
                <Logo />
              </div>

              <div className="p3 mx-5 flex items-center py-5 text-center text-sm leading-relaxed text-white md:text-start">
                Asesoría legal Lideres en Gestión Integral de Proyectos de
                Climatización. Con 25 años de experiencia entregando seguridad
                operacional, bienestar y eficiencia
              </div>
            </div>

            <div className="lg:text-md mx-10 my-auto hidden px-5 lg:block lg:w-1/4">
              Asesoría Legal, especialistas en derecho familiar. Abogado con
              basta experiencia en en materia familiar
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
