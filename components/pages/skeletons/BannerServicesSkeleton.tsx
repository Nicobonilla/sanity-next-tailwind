import React from 'react';
import Background from '../component/Background';
import clsx from 'clsx';

export default function BannerServicesSkeleton() {
  return (
    <Background
      data={{
        typeComponent: 'bannerServices',
      }}
    >
      <div
        className={clsx(
          'relative z-20 mx-auto h-fit px-3 py-16',
          'lg:max-w-screen-xl'
        )}
      >
        {/* Title and Premise Section */}
        <div
          className={clsx(
            'mb-14 flex flex-col items-center justify-center gap-4 text-center md:flex-row'
          )}
        ></div>

        <div className={clsx('relative z-10 flex h-full flex-col gap-6')}>
          <div
            className={clsx(
              'grid size-full gap-0',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            <div className="size-full p-2 sm:p-4">
              <div className="group flex size-full flex-col items-center justify-center rounded-lg bg-indigo-200/60 px-5 py-10">
                <div className="relative mx-auto mb-5 w-fit group-hover:animate-bounce">
                  <div className="relative h-10 w-10"></div>
                </div>
                <div className="relative text-center text-neutral-600">
                  <h3 className="font-montserrat font-semibold uppercase"></h3>
                  <p className="font-montserrat text-sm"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {false && (
        <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-start">
          <div className="relative z-0 h-full w-full"></div>
        </div>
      )}
      <div className="absolute inset-0 z-10 bg-white/70"></div>
    </Background>
  );
}
