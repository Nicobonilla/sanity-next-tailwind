import React from 'react';
import IconCard from './IconCard'; // Importamos el componente `IconCard`
import { ServiceItem } from '@/types';

interface ItemProps {
  services: ServiceItem[];
}

const IconList: React.FC<ItemProps> = ({ services }) => {
  const styleIcon = {
    size: 80,
    color: '#ef4444',
    strokeWidth: 1,
  };
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="h2 mb-12 text-center md:mb-20">
          Create a Website According to Your Business Needs!
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 items-center justify-center gap-10 md:max-w-full md:grid-cols-2 md:gap-5">
          {services.map((item, index) => (
            <IconCard
              key={index}
              iconName={item.iconName || ''} // Solo pasamos el nombre del ícono
              title={item.title}
              description={item.description || ''}
              styleIcon={styleIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconList;
