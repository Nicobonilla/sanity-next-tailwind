'use client';

import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { useTheme } from '@/context/ThemeContext';
import { CSSProperties, useEffect, useState, useMemo } from 'react';

interface BackgroundProps {
  data: ComponentProps;
  children: React.ReactNode;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Color {
  rgb: ColorRGB;
}

interface Theme {
  color1: Color;
  color2: Color;
  color3: Color;
}

interface Themes {
  light: CSSProperties;
  dark: CSSProperties;
}

const defaultColor: Color = { rgb: { r: 0, g: 0, b: 0, a: 0 } };

export function getRgbaString(color: Color, position?: number): string {
  if (!color?.rgb) return 'transparent';
  const { r, g, b, a } = color.rgb;
  return position !== undefined
    ? `rgba(${r}, ${g}, ${b}, ${a}) ${position}%`
    : `rgba(${r}, ${g}, ${b}, ${a})`;
}

const getGradient = (colors: Color[], positions: number[]): string => {
  return `linear-gradient(
    to right,
    ${colors.map((color, index) => getRgbaString(color, positions[index] || 0)).join(', ')}
  )`;
};

export default function Background({ data, children }: BackgroundProps) {
  const { isDarkMode } = useTheme();
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  // Update activeTheme whenever isDarkMode changes
  useEffect(() => {
    setActiveTheme(isDarkMode ? 'dark' : 'light');
    console.log('isDarkMode changed:', isDarkMode);
  }, [isDarkMode]);

  // Generate theme styles
  const themeStyles = useMemo(() => {
    const getThemeStyle = (theme: Theme) => {
      const position1 = data.colorBackground1Position || 0;
      const position2 = data.colorBackground2Position || 100;
      const position3 = data.colorBackground3Position || 100;

      // Fondo de un solo color
      if (
        theme.color1 !== defaultColor &&
        theme.color2 === defaultColor &&
        theme.color3 === defaultColor
      ) {
        return { background: getRgbaString(theme.color1, position1) };
      }

      // Gradiente de dos colores
      if (
        theme.color1 !== defaultColor &&
        theme.color2 !== defaultColor &&
        theme.color3 === defaultColor
      ) {
        const angle = (data?.directionDeg || 0) + 135;
        return {
          background: `linear-gradient(
            ${angle}deg,
            ${getRgbaString(theme.color1, position1)},
            ${getRgbaString(theme.color2, position2)}
          )`,
        };
      }

      // Gradiente de tres colores
      if (
        theme.color1 !== defaultColor &&
        theme.color2 !== defaultColor &&
        theme.color3 !== defaultColor
      ) {
        return {
          background: getGradient(
            [theme.color1, theme.color2, theme.color3],
            [position1, position2, position3]
          ),
        };
      }

      return { background: 'transparent' };
    };

    if (data.backgroundMode === 'image' && data.imageBackground) {
      return {
        light: {
          backgroundImage: `url(${urlForImage(data.imageBackground)?.url()})`,
        },
        dark: {
          backgroundImage: `url(${urlForImage(data.imageBackground)?.url()})`,
        },
      };
    }

    // Implementación para video de fondo
    if (data.backgroundMode === 'video' && data.videoUrl) {
      return {
        light: {
          backgroundColor: 'transparent',
        },
        dark: {
          backgroundColor: 'transparent',
        },
      };
    }

    if (data.backgroundMode === 'colors') {
      const lightTheme: Theme = {
        color1: (data.colorBackground1 as Color) || defaultColor,
        color2: (data.colorBackground2 as Color) || defaultColor,
        color3: (data.colorBackground3 as Color) || defaultColor,
      };

      const darkTheme: Theme = {
        color1: (data.colorBackgroundDark1 as Color) || defaultColor,
        color2: (data.colorBackgroundDark2 as Color) || defaultColor,
        color3: (data.colorBackgroundDark3 as Color) || defaultColor,
      };

      return {
        light: getThemeStyle(lightTheme),
        dark: data.colorWithDarkMode
          ? getThemeStyle(darkTheme)
          : getThemeStyle(lightTheme),
      };
    }

    return {
      light: { background: 'transparent' },
      dark: { background: 'transparent' },
    };
  }, [data]);

  // Get current style based on activeTheme
  const currentStyle = useMemo(() => {
    if (data.backgroundMode === 'colors' && data.colorWithDarkMode) {
      return themeStyles[activeTheme];
    }
    if (data.backgroundMode === 'video' && data.videoUrl) {
      return {
        background: 'transparent',
        position: 'relative',
        zIndex: 0,
      };
    }
    return themeStyles.light;
  }, [activeTheme, data.backgroundMode, data.colorWithDarkMode, themeStyles]);

  return (
    <div
      className={clsx(
        'relative w-full transition-colors duration-300',
        data.backgroundMode === 'image' &&
          'min-h-screen md:min-h-0 lg:max-h-fit',
        data.backgroundMode === 'video' && 'h-[900px]'
      )}
    >
      {data.backgroundMode === 'video' && data.videoUrl && (
        <div className="relative aspect-auto size-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 size-full object-cover"
          >
            <source
              src={data.videoUrl}
              type={'video/' + data.videoType || 'mp4'}
            />
          </video>
          <div
            className={clsx(
              'absolute inset-0 z-10 transition-colors duration-300',
              activeTheme === 'light' ? 'bg-white/80' : 'bg-black/80'
            )}
          />
        </div>
      )}
      {children}
    </div>
  );
}
