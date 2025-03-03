import clsx from 'clsx';
import React from 'react';

export default function Banner1Skeleton() {
  return (
    <div
      className={clsx(
        'relative mx-auto my-20 flex flex-col justify-between gap-8 px-4',
        'lg:max-w-screen-xl lg:flex-row lg:items-stretch lg:gap-12'
      )}
    >
      {/* Contenido */}
      <div className="relative flex w-full flex-col items-start justify-center space-y-4 lg:w-2/3 lg:translate-y-2"></div>

      {/* Imagen */}
      <div className="relative flex min-h-[500px] w-full lg:sticky lg:top-20 lg:w-1/3"></div>
    </div>
  );
}
