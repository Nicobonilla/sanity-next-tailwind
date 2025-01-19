import { InlineSvgPreviewComponent } from '@focus-reactive/sanity-plugin-inline-svg-input';
import Iconfy from './Iconfy';
import Image from 'next/image';
import React from 'react';
import type { ItemProps } from '@/components/pages/PageTemplate';

export type IconProps = {
  svg?: string;
  icon?: {
    icon: string;
    metadata?: {
      hFlip?: boolean;
      vFlip?: boolean;
      rotate?: number;
      size?: {
        width?: number;
        height?: number;
      };
      color?: {
        hex?: string;
      };
    };
  };
};

export default function Icons(item: ItemProps) {
  const { icon, svgIcon, svgIconList } = item;
  const svg = svgIcon || svgIconList?.[0]?.icon || undefined;

  return (
    <>
      {svg ? (
        <InlineSvgPreviewComponent
          value={svg}
          className="inline-svg-preview size-16 object-fill"
        />
      ) : icon?.icon ? (
        <Iconfy
          icon={icon.icon} // Nombre del ícono que se va a renderizar
          metadata={{
            hFlip: icon.metadata?.hFlip, // Flip horizontal si se proporciona
            vFlip: icon.metadata?.vFlip, // Flip vertical si se proporciona
            rotate: icon.metadata?.rotate, // Ángulo de rotación
            size: {
              width: icon.metadata?.size?.width, // Ancho del ícono
              height: icon.metadata?.size?.height, // Alto del ícono
            },
            color: {
              hex: icon.metadata?.color?.hex, // Color del ícono
            },
          }}
        />
      ) : (
        <Image
          src="/intranet.svg"
          fill
          className="inline-svg-preview size-16 p-2"
          alt="Default icon"
        />
      )}
    </>
  );
}
