import clsx from 'clsx';
import { type CSSProperties } from 'react';

type LayerProps = {
  layer: string;
  activeTheme: string;
  currentStyle: CSSProperties;
};

export default function Layer({
  layer,
  activeTheme,
  currentStyle,
}: LayerProps): JSX.Element | undefined {
  //console.log('currentStyle', currentStyle);
  switch (layer) {
    case 'layer6':
      return (
        <div
          className={clsx(
            'absolute inset-0 z-20 size-full items-end transition-colors duration-300'
          )}
        >

        </div>
      );
    case 'layer5':
      return (
        <div
          className={clsx(
            'absolute inset-0 z-20 bg-black/30 transition-colors duration-300'
          )}
        ></div>
      );
    case 'layer4':
      return (
        <div
          className={clsx(
            'absolute inset-0 z-20 bg-black/60 transition-colors duration-300'
          )}
        ></div>
      );
    case 'layer2':
      return (
        <div className="relative inset-0 z-20">
          <div className="absolute inset-0 z-10 transition-colors duration-300" />
          <div className="layer layer1 z-20 bg-gray-100" />
          <div className="layer layer2 z-30 bg-gray-100/70" />
          <div className="layer layer3 z-40 bg-gray-100/40" />
        </div>
      );
    case 'layer3':
      return (
        <div className={'absolute inset-0 z-20'} style={currentStyle}></div>
      );
    case 'layer1':
      return (
        <div
          className={clsx(
            'absolute inset-0 z-20 transition-colors duration-300',
            activeTheme === 'light' ? 'bg-white/60' : 'bg-black/80'
          )}
        ></div>
      );
  }
}
