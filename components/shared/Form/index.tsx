import { ComponentProps } from '@/components/pages/PageTemplate';
import Icon from '@/components/shared/Icon';
import { groupServicesByBusiness } from '@/components/global/Navbar/DeskNav/utils';
import { useSanityContext } from '@/context/SanityContext';

export default function Form() {
  const { pagesLink } = useSanityContext();
  const groupedServices = groupServicesByBusiness(pagesLink);

  function handlerClick() {}
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center gap-10 overflow-hidden p-8 text-slate-600 md:flex-row md:justify-center">
      <div className="relative max-w-md md:w-1/2">
        <h2 className="font-bitter text-xl font-semibold text-red-700">
          Asesoramiento Legal
        </h2>
        <h2 className="mb-4 font-montserrat text-3xl font-bold">
          Abogado Sebastián Bonilla
        </h2>
        <p className="font-bitter">
          Somos expertos en derecho familiar y laboral. Analizamos a fondo cada
          caso y te ofrecemos información clara y oportuna para que tomes las
          mejores decisiones
        </p>
      </div>

      <div className="relative z-20 mt-4 w-full max-w-md text-slate-700 md:w-1/2">
        <form className="relative rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-center font-montserrat text-xl font-semibold">
            ¿Quieres Recibir más Información?
          </h3>
          <p className="mb-4 text-center font-bitter text-gray-500">
            Un ejecutivo se contactará contigo
          </p>
          <div className="text-gray-500">
            <div className="relative mt-4">
              <Icon name="user" size={18} className="absolute left-3 top-1" />
              <input
                type="text"
                id="name"
                placeholder="Nombre"
                required
                className="form-input"
              />
            </div>

            <div className="relative mt-4">
              <Icon name="mail" size={18} className="absolute left-3 top-1" />
              <input
                placeholder="Email"
                type="email"
                id="email"
                required
                className="form-input"
              />
            </div>

            <div className="relative mt-4">
              <Icon name="phone" size={18} className="absolute left-3 top-1" />
              <input
                placeholder="Teléfono"
                type="tel"
                id="phone"
                required
                className="form-input"
              />
            </div>
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
              className="form-input pl-1"
              required
            >
              <option>Selecciona una Opción</option>
              <select className="your-select-classes">
                {Object.entries(groupedServices).map(([name, business]) => (
                  <optgroup key={name} label={name}>
                    {business.map((service, index) => (
                      <option
                        key={`${name}-${index}`}
                        value={service?.title || 'null'}
                      >
                        {service?.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
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
    </div>
  );
}
