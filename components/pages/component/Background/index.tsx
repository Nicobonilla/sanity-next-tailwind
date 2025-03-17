import { memo } from 'react';
import clsx from 'clsx';
import { type BackgroundProps } from './utils';
import Layer from './Layer';

const Background = memo(function Background({ data, styleBg, children }: BackgroundProps) {
  const { typeComponent, variant, layer } = data;


  const containerClassName = clsx('relative w-full transition-colors duration-300', {
    'min-h-screen md:min-h-0 lg:max-h-fit': typeComponent === 'bannerServices',
    'h-[750px] md:h-[500px]': typeComponent === 'heroForm',
    'h-[350px]': typeComponent === 'heading',
    'min-h-[388px] md:min-h-[336px] ': typeComponent === 'highLight',
    'h-[500px] md:h-[650px] items-center justify-center':
      typeComponent === 'carousel' && variant === 'hero',
    'h-full items-center justify-center':
      typeComponent === 'carousel' && variant === 'post',
  });

  return (
    <div className={containerClassName}>
      {layer && <Layer layer={layer} currentStyle={styleBg} />}
      {children}
    </div>
  );
});

Background.displayName = 'Background';

export default Background;
