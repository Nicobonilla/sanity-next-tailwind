'use client';

import React from 'react';
import Background from '../component/Background';

export default function HeadingSkeleton() {
  return (
    <Background data={{ typeComponent: 'heading' }}>
      {' '}
      <div className="relative z-20 flex h-full animate-pulse items-center justify-center">
        <div className="h-12 w-3/4 rounded bg-gray-300" />
      </div>
    </Background>
  );
}
