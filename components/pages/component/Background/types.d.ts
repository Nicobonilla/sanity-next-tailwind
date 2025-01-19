import { type ComponentProps } from '@/components/pages/types';

export interface BackgroundProps {
  data: ComponentProps;
  children: React.ReactNode;
}

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Color {
  rgb: ColorRGB;
}

export interface Theme {
  color1: Color;
  color2: Color;
  color3: Color;
}

export interface Themes {
  light: CSSProperties;
  dark: CSSProperties;
}
