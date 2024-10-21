import { User, Mail, Phone } from 'lucide-react';

export default function Form() {
  function handlerClick() {}
  const color = 'gray';
  return (
    <div className="relative mx-auto flex h-[800px] flex-col items-center gap-10 overflow-hidden bg-gray-100 p-8 text-slate-700 md:flex-row md:justify-center dark:text-slate-700">
      <div className="relative z-10 max-w-md md:w-1/2">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-600">
          Desarrollo de Software
        </h2>
        <h2 className="mb-4 text-3xl font-bold">
          Creamos alianzas para ser tu socio tecnológico
        </h2>
        <p>
          Nuestro objetivo es diseñar el servicio adecuado a tus necesidades,
          oportunidades y posibilidades. Con visión estratégica para mejorar los
          resultados de tu empresa
        </p>
      </div>

      <div className="relative z-20 mt-4 w-full max-w-md md:w-1/2">
        <form className="relative rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-center text-xl font-semibold">
            ¿Quieres Recibir Más Información?
          </h3>
          <p className="mb-4 text-center text-gray-500">
            Un ejecutivo se contactará contigo
          </p>

          <div className="relative mt-4">
            <User
              color={color}
              size={18}
              className="absolute left-3 top-1 text-gray-500"
            />
            <input
              type="text"
              id="name"
              placeholder="Nombre"
              required
              className="w-full rounded border border-gray-300 p-1 pl-10 text-sm"
            />
          </div>

          <div className="relative mt-4">
            <Mail
              color={color}
              size={18}
              className="absolute left-3 top-1 text-gray-500"
            />
            <input
              placeholder="Email"
              type="email"
              id="email"
              required
              className="w-full rounded border border-gray-300 p-1 pl-10 text-sm"
            />
          </div>

          <div className="relative mt-4">
            <Phone
              color={color}
              size={18}
              className="absolute left-3 top-1 text-gray-500"
            />
            <input
              placeholder="Teléfono"
              type="tel"
              id="phone"
              required
              className="w-full rounded border border-gray-300 p-1 pl-10 text-sm"
            />
          </div>

          <div className="mt-4">
            <label
              className="mb-1 block text-sm font-bold"
              htmlFor="servicio-informatico"
            >
              ¿Qué Tipo de Proyecto estás por Emprender?
            </label>
            <select
              id="desarrollo-informatico"
              className="w-full rounded border border-gray-300 p-1 text-sm"
              required
            >
              <option>Selecciona una Opción</option>
              <option>Branding</option>
              <option>Web</option>
              <option>App</option>
              <option>Sistema de Información</option>
              <option>Automatización</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 rounded bg-menuColor2 px-4 py-2 font-extralight text-white"
          >
            Siguientes
          </button>
        </form>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-red-500 md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-2/5"></div>
    </div>
  );
}
