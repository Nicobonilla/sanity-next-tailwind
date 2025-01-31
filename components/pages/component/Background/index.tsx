'use client';

import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { BackgroundProps, useCurrentStyle } from './utils';
import Layer from './Layer';

export default function Background({ data, children }: BackgroundProps) {
  const { isDarkMode } = useTheme();
  const [activeTheme] = useState<'light' | 'dark'>('light');

  const { dataBg, dataComponent } = data;
  const typeComponent = dataComponent?.typeComponent || '';
  const variant = dataComponent?.variant || '';
  const responsiveHeight = dataBg?.responsiveHeight || '';

  const currentStyle = useCurrentStyle(dataBg, isDarkMode);

  return (
    <div
      className={clsx('relative w-full transition-colors duration-300', {
        'min-h-screen md:min-h-0 lg:max-h-fit': responsiveHeight == 'fit-max',
        'h-[900px]': responsiveHeight == 'h-900' || typeComponent == 'heroForm',
        'h-[350px]': typeComponent == 'heading',
        'h-fit md:h-[400px]': typeComponent == 'highLight',
        'h-[80svh] items-center justify-center':
          typeComponent == 'carousel' && variant == 'hero',
      })}
    >
      <div className={'absolute inset-0 z-20'} style={currentStyle}></div>

      {dataBg?.layer && (
        <Layer
          layer={dataBg?.layer}
          activeTheme={activeTheme}
          currentStyle={currentStyle}
        />
      )}

      {children}
    </div>
  );
}
