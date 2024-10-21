import React from 'react';
import { iconMap } from './iconMap'; // Importamos el mapeo de íconos
import Image from 'next/image';

interface StyleIcon {
  size: number;
  color: string;
  strokeWidth: number;
}

interface IconCardProps {
  iconName: string; // Recibe el nombre del ícono
  title: string;
  description: string;
  styleIcon: StyleIcon;
}

const IconCard: React.FC<IconCardProps> = ({
  iconName,
  title,
  description,
  styleIcon,
}) => {
  const Icon = iconMap[iconName]; // Obtenemos el componente del ícono basado en el nombre
  const sizeHole = styleIcon.size + 25;

  if (!Icon) {
    return <div>Ícono no encontrado</div>; // Si el ícono no existe, mostramos un mensaje
  }

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
      <div className="relative z-0 mb-5 flex size-full items-center justify-center md:max-w-24">
        <div className="absolute bottom-0 z-20 -translate-y-2 translate-x-2">
          <Icon
            className="md:w-12"
            size={styleIcon.size}
            color={styleIcon.color}
            strokeWidth={styleIcon.strokeWidth}
          />
        </div>
        <Image
          src={'/gray.svg'}
          className="md:w-20"
          width={sizeHole}
          height={sizeHole}
          alt="follow-me"
        />
      </div>
      <div className="text-center md:text-start">
        <h3 className="mb-3 text-xl font-semibold md:text-lg">{title}</h3>
        <p className="md:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default IconCard;
