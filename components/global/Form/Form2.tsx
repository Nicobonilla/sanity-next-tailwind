import { ComponentProps } from '@/components/types';
import Icon from '@/components/global/Icons/LucideIcon';
import { groupServicesByBusiness } from '@/components/global/Navbar/DeskNav/variants/utils';
import { useSanityContext } from '@/context/SanityContext';
import { GetUnitBusinessListQueryResult } from '@/sanity.types';

export default function Form2() {
  const { unitBusinessList } = useSanityContext();

  function handlerClick() {}
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-10 overflow-hidden px-3 text-slate-600 md:flex-row">
      <div className="relative max-w-md md:w-1/2">
        <h2 className="appercase font-bitter text-xl font-semibold text-red-700">
          ABOGADOS EN SAN FELIPE
        </h2>
        <h2 className="mb-4 font-robotoslab text-3xl font-normal uppercase text-gray-700">
          Sebastián Bonilla Marín
        </h2>
        <p className="font-bitter">
          Somos expertos en derecho familiar y laboral. Analizamos a fondo cada
          caso y te ofrecemos información clara y oportuna para que tomes buenas
          decisiones.
        </p>
      </div>

      <div className="relative z-20 mt-4 w-full max-w-md text-slate-700 md:w-1/2">
        <form className="relative rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-center font-montserrat text-xl font-semibold">
            ¿Quieres Recibir más Información?
          </h3>
          <p className="mb-4 text-center font-bitter text-gray-500">
            Nos contactaremos contigo para resolver tus dudas
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
          <div className="mt-4 text-sm">
            <label
              className="mb-1 block text-sm font-bold"
              htmlFor="servicio-informatico"
            >
              ¿Qué Tipo de Asesproa necesitas?
            </label>
            <select className="your-select-classes">
              <option>Selecciona una Opción</option>
              {unitBusinessList.map(
                (
                  unitBusiness: GetUnitBusinessListQueryResult[number],
                  index
                ) => (
                  <optgroup key={index} label={unitBusiness?.title || ''}>
                    {unitBusiness?.services?.map((service) => (
                      <option
                        key={`${service.slug}`}
                        value={service?.title || 'null'}
                        className="cursor-pointer"
                        onClick={handlerClick}
                      >
                        {service?.title}
                      </option>
                    ))}
                  </optgroup>
                )
              )}
            </select>
            {/* </select>*/}
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
