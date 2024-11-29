import React from 'react';
import { Icon } from '@iconify/react';

type IconfyProps = {
  icon: string; // El nombre del ícono a renderizar
  metadata: {
    hFlip?: boolean; // Flip horizontal
    vFlip?: boolean; // Flip vertical
    rotate?: number; // Ángulo de rotación
    size?: {
      width?: string | number; // Ancho del ícono
      height?: string | number; // Alto del ícono
    };
    color?: {
      hex?: string; // Color del ícono
    };
  };
};

export default function Iconfy({ icon, metadata }: IconfyProps) {
  return (
    <div className="item-banner">
      <Icon
        icon={icon} // Nombre del ícono que se va a renderizar
        hFlip={metadata?.hFlip} // Flip horizontal si se proporciona
        vFlip={metadata?.vFlip} // Flip vertical si se proporciona
        rotate={metadata?.rotate} // Ángulo de rotación
        width={metadata?.size?.width} // Ancho del ícono
        height={metadata?.size?.height} // Alto del ícono
        style={{ color: metadata?.color?.hex }} // Color del ícono
      />
    </div>
  );
}
