'use client';

import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { useTheme } from '@/context/ThemeContext';
import { CSSProperties, useEffect, useState, useMemo } from 'react';
import { BackgroundProps, Color, Theme } from './types';
import { getThemeStyle, defaultColor } from './utils';

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
      const positions = [
        data.colorBackground1Position || 0,
        data.colorBackground2Position || 100,
        data.colorBackground3Position || 100,
      ];

      const lightThemeStyle = getThemeStyle(0, lightTheme, positions);
      const darkThemeStyle = getThemeStyle(0, darkTheme, positions);

      return {
        light: lightThemeStyle,
        dark: data.colorWithDarkMode ? darkThemeStyle : lightThemeStyle,
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
        <div
          className={clsx('absolute inset-0 z-0', currentStyle)} // Mantén currentStyle
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src={data.videoUrl}
              type={'video/' + (data.videoType || 'mp4')}
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
      {
        <div
          className={clsx(
            'z-0 transition-all duration-300',
            data.backgroundMode === 'image' && 'bg-cover bg-fixed bg-center'
          )}
          style={currentStyle}
        >
          {data.backgroundMode === 'image' && (
            <div
              className={clsx(
                'absolute inset-0 z-10 transition-colors duration-300',
                activeTheme === 'light' ? 'bg-white/80' : 'bg-black/80'
              )}
            />
          )}
          {children}
        </div>
      }
      {children}
    </div>
  );
}
