'use client';

import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { type BackgroundProps, getThemeStyle } from './utils';
import Layer from './Layer';
import type { CSSProperties } from 'react';

const Background = memo(function Background({ data, children }: BackgroundProps) {
  const { typeComponent, variant, layer, colors, directionDeg } = data;
  
  // Memoize the style calculation to prevent recalculation on every render
  let currentStyle: CSSProperties | undefined = undefined;
  currentStyle = (colors && layer == 'layer3') ? getThemeStyle(colors, directionDeg) : undefined;

  // Memoize the className calculation to prevent recalculation on every render
  const containerClassName = useMemo(() =>
    clsx('relative w-full transition-colors duration-300', {
      'min-h-screen md:min-h-0 lg:max-h-fit': typeComponent == 'bannerServices',
      'h-[750px] md:h-[500px]': typeComponent == 'heroForm',
      'h-[350px]': typeComponent == 'heading',
      'min-h-[388px] md:min-h-[336px] ': typeComponent == 'highLight',
      'h-[500px] md:h-[650px] items-center justify-center':
        typeComponent == 'carousel' && variant == 'hero',
      'h-full items-center justify-center':
        typeComponent == 'carousel' && variant == 'post',
    })
    , [typeComponent, variant]);

  // Remove console.log statements in production code
  console.log('currentStyle', currentStyle);

  return (
    <div className={containerClassName}>

      {layer && (
        <Layer
          layer={layer}
          currentStyle={currentStyle}
        />
      )}

      {children}
    </div>
  );
});

Background.displayName = 'Background';

export default Background;