import type { ColorItem } from '@/sanity.types';
import { type CSSProperties } from 'react';

export interface BackgroundProps {
  data: {
    typeComponent:
      | 'carousel'
      | 'heading'
      | 'heroForm'
      | 'highLight'
      | 'bannerServices'
      | undefined;
    variant?: 'hero' | 'post' | undefined;
    layer?: string | undefined;
    colors?: ColorItem[] | undefined;
    directionDeg?: number | undefined;
    imageBackgroundType?: 'dynamic' | 'fixed' | undefined;
  };
  children?: React.ReactNode;
}


/**
 * Convierte un color a una representación en formato rgba.
 * @param color - Objeto Color con valores RGB y alfa.
 * @param position - Posición opcional para gradientes.
 * @returns Cadena de texto en formato rgba.
 */
export function getRgba(color: ColorItem): CSSProperties {
  if (!color.lightColor) return {};
  const { rgb, alpha } = color.lightColor;
  if (!rgb) return {};
  const { r, g, b } = rgb;
    return {background: `rgba(${r}, ${g}, ${b}, ${alpha || 1})`}
}


function getRgbaGradient(
  style: 'linear' | 'radial',
  angle: number,
  colors: ColorItem[],
): CSSProperties | undefined {
  const stl = style === 'radial' ? 'radial' : 'linear';
  const ang = style === 'radial' ? 'circle' : `${angle ?? 0}deg`;

  // Construcción correcta de la lista de colores
  const clrs = colors
    .filter(color => color?.lightColor?.rgb) // Filtrar colores válidos
    .map(color => {
      if (!color?.lightColor?.rgb) return '';
      const { r, g, b } = color.lightColor.rgb;
      const a = (color?.lightColor?.alpha ?? 100);
      return `rgba(${r}, ${g}, ${b}, ${a})${color.position ? ` ${color.position}%` : ''}`;
    })
    .join(', '); // Convertir el array en una sola string

  return {
    background: `${stl}-gradient(${ang}, ${clrs})`, // Ahora la sintaxis es válida
  };
}

export const getThemeStyle = (
  colors: ColorItem[] ,
  direction: number = 0,
): CSSProperties | undefined => {

  // Ajustar posiciones para el caso en que estén vacías
  if (colors[0] && colors.length === 1 ){
    return getRgba(colors[0]);
  } else if (colors && colors.length > 1 ){
    return getRgbaGradient('linear', direction, colors)
  } else return undefined
};