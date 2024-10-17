import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={'/'}>
            <div className="flex items-center md:px-10">
                <div className="relative size-14 md:size-16"> {/* Ajusta el tamaño de la imagen si es necesario */}
                    <Image src="/bunnwhite.svg" alt="logo" fill priority />
                </div>
                <span className="w-12 leading-4 text-white font-bold text-sm">
                    SIGUE AL CONEJO!
                </span>
            </div>
        </Link>

    );
}
