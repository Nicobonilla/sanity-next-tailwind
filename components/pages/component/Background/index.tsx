'use client';

import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState, useMemo } from 'react';
import { BackgroundProps, Color, Theme } from './types';
import { getThemeStyle, defaultColor } from './utils';
import Video from './Video';
import Image from 'next/image';
import Layer from './Layer';
import PTextHero from './PTextHero';

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
    if (data.backgroundMode === 'colors' || data.backgroundMode === 'items') {
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
    if (data.backgroundMode == 'colors' || data.backgroundMode == 'items') {
      return data.colorWithDarkMode
        ? themeStyles[activeTheme]
        : themeStyles.light;
    }
    return themeStyles.light;
  }, [activeTheme, data.backgroundMode, data.colorWithDarkMode, themeStyles]);
  return (
    <div
      className={clsx('relative w-full transition-colors duration-300', {
        'className="min-h-screen md:min-h-0 lg:max-h-fit':
          data.responsiveHeight == 'fit-max',
        'h-[900px]': data.responsiveHeight == 'h-900',
      })}
    >
      {data.backgroundMode === 'video' && data.videoUrl && data?.videoType && (
        <Video
          videoUrl={data?.videoUrl}
          videoType={data?.videoType}
          activeTheme={activeTheme}
        />
      )}
      {data.imageBackgroundType == 'dynamic' && (
        <Image
          src={urlForImage(data.imageBackground)?.url() || '/meeting.jpeg'}
          alt="Hero image for the homepage"
          className="inset-0 size-full object-cover object-top"
          quality={100}
          fill
          priority
        />
      )}
      {data.backgroundMode == 'colors' ||
        (data.backgroundMode == 'items' && (
          <div className={'absolute inset-0 z-10'} style={currentStyle}>
            {' '}
          </div>
        ))}
      {data.imageBackgroundType === 'fixed' && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: `url(${urlForImage(data.imageBackground)?.url() || ''})`,
          }}
        />
      )}

      {data.responsiveHeight == 'h-900' &&
        data.typeComponentValue != 'heroForm' && <PTextHero data={data} />}
      {data.responsiveHeight == 'fit-max' ||
        (data.typeComponentValue == 'heroForm' && children)}
      {data.imageBackgroundLayer && (
        <Layer layer={data.imageBackgroundLayer} activeTheme={activeTheme} currentStyle={currentStyle} />
      )}
    </div>
  );
}
