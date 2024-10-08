import Image from "next/image";

export default function Logo() {
    return (
        <>
            <Image src="/bunnwhite.svg"
                width={60}
                height={80}
                alt="logo" />
            <div className="flex flex-col">
                <span className="leading-4 w-16 text-white font-bold my-auto text-[14px]">SIGUE AL CONEJO!</span>
            </div>
        </>
    )
}

