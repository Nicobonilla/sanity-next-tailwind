import React from 'react';
import { ItemServicios } from './ItemServicios';
import { ServiceItem } from '@/types';

interface ImageListCardProps {
  services: ServiceItem[];
}

const BasicImageCard: React.FC<ImageListCardProps> = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-5 px-2 py-5 md:grid-cols-2 lg:grid-cols-3 lg:px-0"></div>
  );
};

export default BasicImageCard;
