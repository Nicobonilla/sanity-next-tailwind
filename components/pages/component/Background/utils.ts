import { CSSProperties } from 'react';
import { Color, Theme } from './types';

export const defaultColor: Color = {
  rgb: { r: 0, g: 0, b: 0, a: 1 },
};

export function getRgbaString(color: Color, position?: number): string {
  if (!color?.rgb) return 'transparent';
  const { r, g, b, a } = color.rgb;
  return position !== undefined
    ? `rgba(${r}, ${g}, ${b}, ${a}) ${position}%`
    : `rgba(${r}, ${g}, ${b}, ${a})`;
}

const getGradient = (
  angle: number,
  colors: Color[],
  positions: number[]
): string => {
  return `${colors.length > 1 ? `linear-gradient(${angle}deg,` : ''} ${colors
    .map((color, index) => getRgbaString(color, positions[index] || 0))
    .join(', ')})`;
};

export const getThemeStyle = (
  angle: number,
  theme: Theme,
  positions: number[] = []
): CSSProperties => {
  const colors: Color[] = [];

  Object.values(theme).forEach((color, index) => {
    if (color !== defaultColor) {
      colors.push(color);
    }
  });

  switch (colors.length) {
    case 0:
      return { background: 'transparent' };
    case 1:
      return { background: getRgbaString(colors[0]) };
    default:
      return { background: getGradient(angle, colors, positions) };
  }
};
