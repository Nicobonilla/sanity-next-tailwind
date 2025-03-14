import type { ColorItem } from '@/sanity.types';
import { type CSSProperties, useMemo } from 'react';

const defaultColor: Color = {
  rgb: { r: 255, g: 255, b: 255, a: 0 },
};
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
    responsiveHeight?: string;
    imageBackground?: {
      asset?: {
        _ref: string;
        _type: string;
      };
    };
    layer?: string;
    colors?: ColorItem[];
    directionDeg ?: number;
    imageBackgroundType?: 'dynamic';
  };
  children?: React.ReactNode;
}

export interface Color {
  rgb: {
    r: number;
    g: number;
    b: number;
    a?: number | undefined;
    _type?: string | undefined;
  };
}

interface Theme {
  colors: Color[]; // Cambiado para ser un array de colores
}

/**
 * Convierte un color a una representación en formato rgba.
 * @param color - Objeto Color con valores RGB y alfa.
 * @param position - Posición opcional para gradientes.
 * @returns Cadena de texto en formato rgba.
 */
export function getRgbaString(color: Color, position?: number): string {
  if (!color?.rgb) return 'transparent';
  const { r, g, b, a } = color.rgb;
  return position !== undefined
    ? `rgba(${r}, ${g}, ${b}, ${a}) ${position}%`
    : `rgba(${r}, ${g}, ${b}, ${a})`;
}

const getGradient = (
  style: 'linear' | 'radial',
  angle: number = 0,
  colors: Color[]  ,
  positions: number[] = []
): string => {
  const normalizedPositions = colors.map((_, index) =>
    positions[index] !== undefined
      ? positions[index]
      : (index / (colors.length - 1)) * 100
  );

  if (style === 'radial') {
    return `radial-gradient(circle, ${colors
      .map((color, index) => getRgbaString(color, normalizedPositions[index]))
      .join(', ')})`;
  }
  return `linear-gradient(${angle}deg, ${colors
    .map((color, index) => getRgbaString(color, normalizedPositions[index]))
    .join(', ')})`;
};

const getThemeStyle = (
  style: 'linear' | 'radial',
  angle: number,
  theme: Theme,
  positions: number[] = []
): CSSProperties => {
  const colors: Color[] = theme.colors;

  // Ajustar posiciones para el caso en que estén vacías
  const normalizedPositions =
    positions.length === colors.length
      ? positions
      : colors.map((_, index) => (index / (colors.length - 1)) * 100);

  if (colors.length === 0) {
    return { background: 'transparent' };
  } else if (colors.length === 1) {
    return { background: getRgbaString(colors[0] || defaultColor) };
  } else {
    return {
      background: getGradient(style, angle, colors, normalizedPositions),
    };
  }
};

export function useCurrentStyle(
  data: {
    colors?: ColorItem[]  | undefined;
    directionDeg?: number | undefined;
  },
  isDarkMode: boolean
): CSSProperties {
  const themeStyles = useMemo(() => {
    const createThemeColors = (useLight: boolean) => ({
      colors: data?.colors?.map((item: ColorItem) => {
        // Get the appropriate color based on light/dark mode
        const colorSource = useLight ? item.lightColor : item.darkColor || item.lightColor;
        // Ensure r, g, b values are present with defaults if missing
        return {
          rgb: {
            r: colorSource?.rgb?.r ?? 255, // Default to white if missing
            g: colorSource?.rgb?.g ?? 255,
            b: colorSource?.rgb?.b ?? 255,
            a: colorSource?.alpha ?? 0,
            _type: colorSource?.rgb?._type
          },
        };
      }) || [defaultColor],
    });

    const positions : (number | undefined)[]  =data?.colors?.map((item: ColorItem) => item.colorBackground1Position) || [];
    const dir = data?.directionDeg || 0;

    const lightTheme = createThemeColors(true);
    const darkTheme = createThemeColors(false);

    return {
      light: getThemeStyle('linear', dir, lightTheme, positions as number[]), 
      dark: getThemeStyle('linear', dir, darkTheme, positions as number []),
    };
  }, [data]);

  return themeStyles[ isDarkMode ? 'dark' : 'light'];
}
