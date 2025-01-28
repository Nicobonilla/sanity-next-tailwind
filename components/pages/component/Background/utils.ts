import { Component, CSSProperties, useMemo } from 'react';
import { ComponentProps } from '@/components/types';
export const defaultColor: Color = {
  rgb: { r: 255, g: 255, b: 255, a: 0 },
};
export interface BackgroundProps {
  data: ComponentProps;
  children: React.ReactNode;
}

export interface Color {
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface Theme {
  colors: Color[]; // Cambiado para ser un array de colores
}

export interface Themes {
  light: CSSProperties;
  dark: CSSProperties;
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
  angle: number,
  colors: Color[],
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
    return { background: getRgbaString(colors[0]) };
  } else {
    return {
      background: getGradient(style, angle, colors, normalizedPositions),
    };
  }
};

type ColorList = ComponentProps['backgroundValue']['colors'];
type ColorListItem2 = ComponentProps['backgroundValue']['colors'][number];
interface SanityColor {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  alpha: number;
  hex: string;
  hsv: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
}
interface ColorListItem {
  lightColor: SanityColor;
  darkColor: SanityColor | null;
  colorBackground1Position: number;
}

export function useCurrentStyle(
  data: ColorList,
  isDarkMode: boolean
): CSSProperties {
  const { colorWithDarkMode } = data || false;
  const themeStyles = useMemo(() => {
    const createThemeColors = (useLight: boolean) => ({
      colors: data?.colors?.map((item: ColorListItem) => ({
        rgb: {
          ...((useLight ? item.lightColor : item.darkColor)?.rgb ||
            item.lightColor.rgb),
          a:
            (useLight ? item.lightColor : item.darkColor)?.alpha ||
            item.lightColor.alpha,
        },
      })) || [defaultColor],
    });

    const positions =
      data?.colors?.map(
        (item: ColorListItem) => item.colorBackground1Position
      ) || [];
    const dir = data?.directionDeg || 0;

    const lightTheme = createThemeColors(true);
    const darkTheme = createThemeColors(false);

    return {
      light: getThemeStyle('linear', dir, lightTheme, positions),
      dark: getThemeStyle('linear', dir, darkTheme, positions),
    };
  }, [data]);

  return themeStyles[colorWithDarkMode && isDarkMode ? 'dark' : 'light'];
}
