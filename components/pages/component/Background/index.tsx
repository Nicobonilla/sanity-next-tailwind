'use client';

import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { BackgroundProps, useCurrentStyle } from './utils';
import Layer from './Layer';

export default function Background({ data, children }: BackgroundProps) {
  const { isDarkMode } = useTheme();
  const [activeTheme] = useState<'light' | 'dark'>('light');

  const { typeComponent, variant, responsiveHeight, layer } = data;
  const currentStyle = useCurrentStyle(data, isDarkMode);

  return (
    <div
      className={clsx('relative w-full transition-colors duration-300', {
        'min-h-screen md:min-h-0 lg:max-h-fit':
          responsiveHeight == 'fit-max' || typeComponent == 'bannerServices',
        'h-[900px]': responsiveHeight == 'h-900',
        'h-[750px] md:h-[500px]': typeComponent == 'heroForm',
        'h-[350px]': typeComponent == 'heading',
        'h-fit md:h-[400px]': typeComponent == 'highLight',
        'h-[50svh] items-center justify-center':
          typeComponent == 'carousel' && variant == 'hero',
        'flex h-fit items-center justify-center':
          data.typeComponent == 'carousel' && variant == 'post',
      })}
    >
      {data?.colors && (
        <div className={'absolute inset-0 z-20'} style={currentStyle}></div>
      )}

      {layer && (
        <Layer
          layer={layer}
          activeTheme={activeTheme}
          currentStyle={currentStyle}
        />
      )}

      {children}
    </div>
  );
}
