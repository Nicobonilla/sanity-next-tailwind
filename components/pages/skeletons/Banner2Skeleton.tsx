import clsx from 'clsx';
import React from 'react';

export default function Banner2Skeleton() {
  return (
    <div
      className={clsx('form-h relative overflow-hidden p-8', 'md:p-0 md:px-2')}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-0 z-0 h-fit bg-blue-900 xs5:py-5',
          'shadow-2xl md:left-auto md:right-0 md:top-10 md:w-2/5'
        )}
      >
        <div
          className={clsx(
            'relative z-10 mx-auto max-w-md items-center justify-center p-5 dark:text-slate-200',
            'md:mx-0 md:md:p-2'
          )}
        >
          <div className="my-auto w-full flex-col items-center justify-center pr-5 text-right md:mt-5">
            <h2 className="mb-2 w-full bg-white pr-4 font-crimson text-2xl font-extrabold uppercase text-gray-800 dark:text-red-500"></h2>
            <h2 className="mb-4 pl-10 font-montserrat text-lg font-thin text-white drop-shadow-xl"></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
