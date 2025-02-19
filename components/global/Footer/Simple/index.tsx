import Logo from '@/components/global/Logo';

export default function Simple() {
  return (
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
  );
}
