import React from 'react';
import Background from '../component/Background';
import ImageBg from '../component/Background/ImageBg';
import clsx from 'clsx';

export default function HighLightSkeleton() {
  return (
    <Background
      data={{
        typeComponent: 'highLight',
      }}
    >
      <div
        className={clsx(
          'relative inset-0 z-20 flex flex-col items-center justify-center py-20 text-center text-neutral-800',
          'xs5:px-10',
          'md:py-auto md:mx-auto md:max-w-screen-lg'
        )}
      ></div>

      <div className="absolute inset-0 z-10 size-full bg-white/25"></div>
    </Background>
  );
}
