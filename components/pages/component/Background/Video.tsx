import clsx from 'clsx';

export default function Video({
  videoUrl,
  videoType,
  activeTheme,
}: {
  videoUrl: string;
  videoType: string;
  activeTheme: string;
}) {
  return (
    <div
      className={'relative inset-0 z-0 size-full'} // Mantén currentStyle
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 size-full object-cover"
      >
        <source src={videoUrl} type={'video/' + (videoType || 'mp4')} />
      </video>
      <div
        className={clsx(
          'absolute inset-0 z-10 transition-colors duration-300',
          activeTheme === 'light' ? 'bg-white/80' : 'bg-black/80'
        )}
      />
    </div>
  );
}
