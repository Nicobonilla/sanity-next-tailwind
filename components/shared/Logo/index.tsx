import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center px-10">
            <div className="relative w-16 h-16"> {/* Ajusta el tamaño de la imagen si es necesario */}
                <Image src="/bunnwhite.svg" alt="logo" fill priority />
            </div>
            <span className="w-12 leading-4 text-white font-bold text-sm">
                SIGUE AL CONEJO!
            </span>
        </div>
    );
}
