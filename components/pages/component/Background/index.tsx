'use client';

import clsx from 'clsx';
import { BackgroundProps, useCurrentStyle } from './utils';
import Layer from './Layer';

export default function Background({ data, children }: BackgroundProps) {

  const { typeComponent, variant, responsiveHeight, layer } = data;
  const currentStyle = useCurrentStyle(data, false);

  return (
    <div
      className={clsx('relative w-full transition-colors duration-300', {
        'min-h-screen md:min-h-0 lg:max-h-fit':
          responsiveHeight == 'fit-max' || typeComponent == 'bannerServices',
        'h-[900px]': responsiveHeight == 'h-900',
        'h-[750px] md:h-[500px]': typeComponent == 'heroForm',
        'h-[350px]': typeComponent == 'heading',
        'min-h-[388px] md:min-h-[336px] ': typeComponent == 'highLight',
        'h-[500px] md:h-[650px] items-center justify-center':
          typeComponent == 'carousel' && variant == 'hero',
        'h-full items-center justify-center':
          typeComponent == 'carousel' && variant == 'post',
      })}
    >
      {data?.colors && (
        <div className={'absolute inset-0 z-20'} style={currentStyle}></div>
      )}

      {layer && (
        <Layer
          layer={layer}
          activeTheme={'light'}
          currentStyle={currentStyle}
        />
      )}

      {children}
    </div>
  );
}
