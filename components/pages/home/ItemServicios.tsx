import Image from "next/image";

type Props = {
    servicio: string;
    img: string;
};

export function ItemServicios({ servicio, img }: Props) {
    return (
        <div className="bg-white text-center w-auto">
            <div className="relative w-full max-h-80 h-[50vh] z-0 group overflow-hidden">
                <Image
                    src={img}
                    alt={"Home page image"}
                    quality={100}
                    fill
                    className="transition-transform duration-300 transform group-hover:scale-110"
                    style={{
                        objectFit: "cover",
                    }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-menuColor2/50 transition duration-300 group-hover:bg-slate-200/90"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                    <div className="text-4xl font-bold text-white group-hover:text-textBlue mx-6 transition duration-300">
                        {servicio}
                    </div>
                </div>
            </div>
        </div>
    );
}
