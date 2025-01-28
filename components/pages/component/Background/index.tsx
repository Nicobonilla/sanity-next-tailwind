'use client';

import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { BackgroundProps, useCurrentStyle } from './utils';
import Layer from './Layer';

export default function Background({ data, children }: BackgroundProps) {
  const { isDarkMode } = useTheme();
  const [activeTheme] = useState<'light' | 'dark'>('light');
  const { bg, typeComponent } = data;
  const responsiveHeight = bg?.responsiveHeight || '';

  const currentStyle = useCurrentStyle(bg, isDarkMode);

  return (
    <div
      className={clsx('relative w-full transition-colors duration-300', {
        'min-h-screen md:min-h-0 lg:max-h-fit': responsiveHeight == 'fit-max',
        'h-[900px]': responsiveHeight == 'h-900' || typeComponent == 'heroForm',
        'h-[350px]': typeComponent == 'heading',
        'h-fit md:h-[400px]': typeComponent == 'highLight',
      })}
    >
      <div className={'absolute inset-0 z-20'} style={currentStyle}></div>

      {bg?.layer && (
        <Layer
          layer={bg?.layer}
          activeTheme={activeTheme}
          currentStyle={currentStyle}
        />
      )}

      {children}
    </div>
  );
}
