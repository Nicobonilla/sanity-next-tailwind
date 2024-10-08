import React from 'react';
import IconCard from './IconCard'; // Importamos el componente `IconCard`
import { ServiceItem } from '@/types';

interface ItemProps {
  services: ServiceItem[];
}

const IconList: React.FC<ItemProps> = ({ services }) => {

  const styleIcon = {
    size: 80,
    color: '#cf1788', 
    strokeWidth: 1
  }
  return (
    <div className="bg-gray-900 py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-extrabold text-white text-center 
        mb-12 md:mb-20 ">
          Create a Website According to Your Business Needs!
        </h2>
        <div className="grid gap-10 md:gap-5
           grid-cols-1 md:grid-cols-2 
           items-center justify-center mx-auto
            max-w-md md:max-w-full"
        >

          {services.map((item, index) => (
            <IconCard
              key={index}
              iconName={item.iconName}  // Solo pasamos el nombre del ícono
              title={item.title}
              description={item.description}
              styleIcon={styleIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconList;
