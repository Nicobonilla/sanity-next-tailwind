'use client';

import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { ComponentProps } from '@/components/pages/PageTemplate';
import { useTheme } from '@/context/ThemeContext';
import { CSSProperties, useEffect, useState, useMemo } from 'react';
import { BackgroundProps, Color, Theme } from './types';
import { getThemeStyle, defaultColor } from './utils';
import Video from './Video';
import Image from 'next/image';
import Layer, { type LayerProps } from './Layer';
import PTextHero from './PTextHero';
import InnerBannerWithItems from './InnerBannerWithItems';

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
    if (
      data.backgroundMode === 'colors' ||
      (data.backgroundMode === 'items' && data.colorWithDarkMode)
    ) {
      return themeStyles[activeTheme];
    }
    return themeStyles.light;
  }, [activeTheme, data.backgroundMode, data.colorWithDarkMode, themeStyles]);
  console.log('responsiveHeight:', data.responsiveHeight);
  return (
    <div
      className={clsx('relative w-full transition-colors duration-300', {
        'className="min-h-screen md:min-h-0 lg:max-h-fit':
          data.responsiveHeight == 'fit-max',
        'h-[900px]': data.responsiveHeight == 'h-900',
      })}
    >
      {data.backgroundMode === 'video' && data.videoUrl && (
        <Video
          videoUrl={data?.videoUrl}
          videoType={data.videoType}
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
      {data.imageBackgroundType == 'fixed' ||
        data.backgroundMode == 'colors' ||
        (data.backgroundMode == 'items' && (
          <div className={'absolute inset-0 z-10'} style={currentStyle}>
            {' '}
          </div>
        ))}

      {data.responsiveHeight == 'h-900' && <PTextHero data={data} />}
      {data.responsiveHeight == 'fit-max' && children}
      {data.imageBackgroundLayer && (
        <Layer layer={data.imageBackgroundLayer} activeTheme={activeTheme} />
      )}
    </div>
  );
}
