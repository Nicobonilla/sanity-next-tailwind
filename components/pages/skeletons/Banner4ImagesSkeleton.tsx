import clsx from 'clsx';
import React from 'react';

export default function Banner4ImagesSkeleton() {
  return (
    <section
      className={clsx(
        'w-full bg-gradient-to-br from-blue-950 to-blue-800 py-12',
        'md:py-16 lg:items-center lg:justify-center lg:py-20'
      )}
    >
      <div className="mx-auto h-fit max-w-screen-lg px-4 lg:w-fit">
        <div
          className={clsx(
            'grid min-h-[800px] gap-4',
            'sm:grid-cols-2 lg:h-[700px] lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-3'
          )}
        ></div>
      </div>
    </section>
  );
}
