import React from 'react';

const Video = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/videos/vid1.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {'Hola'}
        </h1>
      </div>
    </div>
  );
};

export default Video;
