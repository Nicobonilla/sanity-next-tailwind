import type { ColorItem } from '@/sanity.types';
import { type CSSProperties } from 'react';

// Caché para almacenar estilos calculados previamente
const styleCache = new Map<string, CSSProperties | undefined>();

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
  styleBg?: CSSProperties | undefined;
  children?: React.ReactNode;
}

// Definición flexible para los colores
type FlexibleColorItem = {
  lightColor?: {
    rgb?: {
      r?: number | null;
      g?: number | null;
      b?: number | null;
    } | null;
    alpha?: number | null;
  } | null;
  position?: number | null;
};

/**
 * Convierte un color a una representación en formato rgba.
 * @param color - Objeto Color con valores RGB y alfa.
 * @returns Cadena de texto en formato rgba.
 */
export function getRgba(color: FlexibleColorItem | undefined | null): CSSProperties {
  // Verificar si color existe
  if (!color || !color.lightColor || !color.lightColor.rgb) {
    return {};
  }
  
  const { rgb, alpha } = color.lightColor;
  
  // Extraer y normalizar valores r, g, b
  const r = typeof rgb.r === 'number' ? rgb.r : 0;
  const g = typeof rgb.g === 'number' ? rgb.g : 0;
  const b = typeof rgb.b === 'number' ? rgb.b : 0;
  const a = typeof alpha === 'number' ? alpha : 1;
  
  return { background: `rgba(${r}, ${g}, ${b}, ${a})` };
}

/**
 * Genera un gradiente CSS basado en colores y ángulo.
 * @param style - Estilo del gradiente ('linear' o 'radial').
 * @param angle - Ángulo del gradiente (para linear).
 * @param colors - Array de objetos de color.
 * @returns Objeto CSSProperties con el gradiente.
 */
function getRgbaGradient(
  style: 'linear' | 'radial',
  angle: number | undefined,
  colors: FlexibleColorItem[]
): CSSProperties {
  // Usar valor por defecto para style si es undefined
  const stl = style === 'radial' ? 'radial' : 'linear';
  // Usar valor por defecto para angle si es undefined
  const ang = style === 'radial' ? 'circle' : `${angle !== undefined ? angle : 0}deg`;

  // Filtrar colores válidos y construir la lista de colores
  const clrs = colors
    .filter(color => color && color.lightColor && color.lightColor.rgb)
    .map(color => {
      // Ya verificamos que estos valores existen en el filter
      const rgb = color.lightColor!.rgb!;
      const r = typeof rgb.r === 'number' ? rgb.r : 0;
      const g = typeof rgb.g === 'number' ? rgb.g : 0;
      const b = typeof rgb.b === 'number' ? rgb.b : 0;
      const a = typeof color.lightColor!.alpha === 'number' ? color.lightColor!.alpha : 1;
      const position = typeof color.position === 'number' ? ` ${color.position}%` : '';
      
      return `rgba(${r}, ${g}, ${b}, ${a})${position}`;
    })
    .join(', ');

  // Si no hay colores válidos, devolver un objeto vacío
  if (!clrs) {
    return {};
  }

  return {
    background: `${stl}-gradient(${ang}, ${clrs})`,
  };
}

/**
 * Genera estilos CSS basados en colores y dirección.
 * @param colors - Array de objetos de color.
 * @param direction - Dirección del gradiente en grados.
 * @returns Objeto CSSProperties con los estilos.
 */
export const getThemeStyle = (
  colors: FlexibleColorItem[] | undefined | null,
  direction?: number | null
): CSSProperties | undefined => {
  // Verificar que colors es un array y tiene elementos
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return undefined;
  }

  // Para un solo color, usar getRgba
  if (colors.length === 1) {
    return getRgba(colors[0]);
  } 
  
  // Para múltiples colores, usar getRgbaGradient
  // Convertir null a undefined para direction
  const directionValue = direction !== null ? direction : undefined;
  return getRgbaGradient('linear', directionValue, colors);
};

/**
 * Versión con caché de getThemeStyle que mejora el rendimiento
 * reutilizando estilos calculados previamente.
 * 
 * @param colors - Array de objetos de color.
 * @param direction - Dirección del gradiente en grados (por defecto 0).
 * @returns Objeto CSSProperties con los estilos.
 */
export function getCachedThemeStyle(
  colors: ColorItem[] | undefined | null,
  direction: number = 0
): CSSProperties | undefined {
  // Si no hay colores, retornar undefined directamente
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return undefined;
  }

  try {
    // Crear una clave única para la caché basada en los colores y la dirección
    const cacheKey = JSON.stringify({ colors, direction });

    // Verificar si el estilo ya está en la caché
    if (styleCache.has(cacheKey)) {
      return styleCache.get(cacheKey); // 🚀 Retorna desde la caché
    }

    // Calcular el estilo
    const computedStyle = getThemeStyle(colors, direction);
    
    // Guardar en la caché para uso futuro
    styleCache.set(cacheKey, computedStyle); // 📝 Guarda en la caché

    return computedStyle;
  } catch (error) {
    // En caso de error (por ejemplo, si JSON.stringify falla),
    // calcular el estilo sin usar la caché
    console.error('Error al usar la caché de estilos:', error);
    return getThemeStyle(colors, direction);
  }
}
