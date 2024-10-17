import React from 'react';
import Image from 'next/image';

interface ItemServiciosProps {
    servicio: string;
    img: string;
    description?: string;
}

export const ItemServicios: React.FC<ItemServiciosProps> = ({ servicio, img, description }) => {
    return (
        <div className="w-auto bg-white text-center">
            <div className="relative w-full h-[50vh] max-h-80 overflow-hidden rounded group z-0">
                <Image
                    src={img}
                    alt={servicio}
                    quality={100}
                    fill
                    className="transform transition-transform duration-300 group-hover:scale-110"
                    style={{ objectFit: "cover" }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-menuColor2/50 transition duration-300 group-hover:bg-slate-200/90"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                    <div className="mx-6 text-4xl font-bold text-white transition duration-300 group-hover:text-textBlue">
                        {servicio}
                    </div>
                </div>
            </div>
        </div>
    );
};