import { User, Mail, Phone } from "lucide-react";

export default function Form() {
    function handlerClick() {
    }
    const color = "gray";
    return (
        <div className="relative flex flex-col items-center overflow-hidden bg-gray-100 p-8 gap-10 mx-auto text-slate-700 dark:text-slate-700 md:flex-row md:justify-center">
            <div className="relative z-10 max-w-md md:w-1/2">
                <h2 className="text-xl font-bold text-red-200 dark:text-red-600">Desarrollo de Software</h2>
                <h2 className="mb-4 text-3xl font-bold">Creamos alianzas para ser tu socio tecnológico</h2>
                <p>
                    Nuestro objetivo es diseñar el servicio adecuado a tus necesidades, oportunidades y posibilidades.
                    Con visión estratégica para mejorar los resultados de tu empresa
                </p>
            </div>

            <div className="relative z-20 w-full mt-4 max-w-md md:w-1/2">
                <form className="relative p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-xl font-semibold text-center">
                        ¿Quieres Recibir Más Información?
                    </h3>
                    <p className="mb-4 text-center text-gray-500">
                        Un ejecutivo se contactará contigo
                    </p>

                    <div className="relative mt-4">
                        <User color={color} size={18} className="absolute top-1 left-3 text-gray-500" />
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre"
                            required
                            className="w-full p-1 pl-10 text-sm border border-gray-300 rounded"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Mail color={color} size={18} className="absolute top-1 left-3 text-gray-500" />
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            required
                            className="w-full p-1 pl-10 text-sm border border-gray-300 rounded"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Phone color={color} size={18} className="absolute top-1 left-3 text-gray-500" />
                        <input
                            placeholder="Teléfono"
                            type="tel"
                            id="phone"
                            required
                            className="w-full p-1 pl-10 text-sm border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 text-sm font-bold" htmlFor="servicio-informatico">
                            ¿Qué Tipo de Proyecto estás por Emprender?
                        </label>
                        <select
                            id="desarrollo-informatico"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
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

                    <button type="submit" className="px-4 py-2 mt-6 font-extralight text-white bg-menuColor2 rounded">
                        Siguientes
                    </button>
                </form>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-red-500 md:inset-y-0 md:right-0 md:left-auto md:w-2/5 md:h-full z-0"></div>
        </div>
    );
}