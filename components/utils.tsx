export interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Color {
  rgb: ColorRGB;
}

export function getRgbaString(color: Color, position?: number): string {
  if (!color?.rgb) return 'transparent';
  const { r, g, b, a } = color.rgb;
  return position !== undefined
    ? `rgba(${r}, ${g}, ${b}, ${a}) ${position}%`
    : `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function getActiveColor(
  isDarkMode: boolean | undefined,
  colorWithDarkMode: boolean | undefined,
  lightColor: Color,
  darkColor?: Color | undefined
): Color {
  return isDarkMode && colorWithDarkMode && darkColor
    ? darkColor
    : (lightColor ?? { rgb: { r: 0, g: 0, b: 0, a: 0 } });
}

import { GetComponentListQueryResult } from '@/sanity.types';

export function transformToDict(
  components: GetComponentListQueryResult | null
): Record<string, string | null> {
  if (!components) return {};

  const result = components.reduce(
    (acc, { value, name }) => {
      if (value) {
        acc[value] = name; // Asigna el value al nombre en el diccionario
      }
      return acc; // Devuelve el acumulador
    },
    {} as Record<string, string | null>
  );
  return result;
}
