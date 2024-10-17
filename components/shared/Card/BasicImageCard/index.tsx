import React from 'react';
import { ItemServicios } from './ItemServicios';
import { ServiceItem } from '@/types';

interface ImageListCardProps {
    services: ServiceItem[];
}

const BasicImageCard: React.FC<ImageListCardProps> = ({ services }) => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 gap-5 px-2 py-5 lg:px-0">
            {services.map((service, index) => (
                <ItemServicios
                    key={index}
                    servicio={service.title}
                    img={service.img || ''}
                    description={service.description || ''} // Pasar la descripción
                />
            ))}
        </div>
    );
}

export default BasicImageCard;