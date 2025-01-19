import Logo from '@/components/global/Logo';

export default function WPlike() {
  return (
    <div className="mt-10 bg-bodydark p-10 text-white">
      <div className="container mx-auto flex flex-col justify-between md:flex-row md:items-center">
        {/* Logo y descripción */}
        <div className="flex flex-col md:mx-10 md:flex-row lg:w-1/2">
          <div className="flex justify-start md:mr-4">
            <Logo />
          </div>
          <p className="mb-2 mt-1 font-montserrat text-sm md:text-base">
            Somos expertos en desarrollo de software, diseño y marketing digit
          </p>
        </div>

        {/* Formulario */}
        <div className="flex flex-col items-end lg:w-1/4">
          <h2 className="mb-1 font-bitter">SÍGUENOS</h2>
          <form className="relative flex items-center">
            <input
              type="email"
              placeholder="Dirección de correo"
              className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              type="submit"
              className="absolute right-3 text-2xl font-extrabold text-red-500 hover:text-red-600"
            >
              →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
