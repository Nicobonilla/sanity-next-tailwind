import { User, Mail, Phone } from "lucide-react";

export default function Form() {
    const color = "gray";
    return (
        <div className="relative flex flex-col 
        bg-gray-100 p-8 gap-10 mx-auto 
        md:flex-row md:justify-center items-center overflow-hidden">

            <div className="md:w-1/2 max-w-md relative z-10">
                <h2 className="text-xl font-bold">Desarrollo de Software</h2>
                <h2 className="text-3xl font-bold mb-4">Creamos alianzas para ser tu socio tecnológico</h2>
                <p className="text-gray-600">
                    Nuestro objetivo es diseñar el servicio adecuado a tus necesidades, oportunidades y posibilidades.
                    Con visión estratégica para mejorar los resultados de tu empresa
                </p>
            </div>

            <div className="relative mt-4 max-w-md z-20 w-full md:w-1/2">
                <form className="bg-white p-6 rounded-lg shadow-md relative">
                    <h3 className="text-xl text-center font-semibold mb-4">
                        ¿Quieres Recibir Más Información?
                    </h3>
                    <p className="text-gray-500 mb-4 text-center">
                        Un ejecutivo se contactará contigo
                    </p>

                    <div className="relative mt-4">
                        <User color={color} size={18} className="absolute left-3 top-1 text-gray-500" />
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre"
                            required
                            className="pl-10 text-sm w-full border border-gray-300 p-1 rounded"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Mail color={color} size={18} className="absolute left-3 top-1 text-gray-500" />
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            required
                            className="pl-10 text-sm w-full border border-gray-300 p-1 rounded"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Phone color={color} size={18} className="absolute left-3 top-1 text-gray-500" />
                        <input
                            placeholder="Teléfono"
                            type="tel"
                            id="phone"
                            required
                            className="text-sm pl-10 w-full border border-gray-300 p-1 rounded"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 font-bold text-sm" htmlFor="servicio-informatico">
                            ¿Qué Tipo de Proyecto estás por Emprender?
                        </label>
                        <select
                            id="desarrollo-informatico"
                            className="text-sm w-full border border-gray-300 p-1 rounded"
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

                    <button type="submit" className="mt-6 bg-menuColor2 font-extralight text-white py-2 px-4 rounded">
                        Siguientes
                    </button>
                </form>
            </div>
            <div className="absolute bg-red-500 
                inset-x-0 bottom-0 h-1/2
                md:inset-y-0 md:right-0 md:w-2/5 md:h-full md:left-auto 
                z-0"></div>

        </div>
    );
}