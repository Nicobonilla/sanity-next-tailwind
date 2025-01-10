import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { ComponentProps } from '@/components/pages/PageTemplate';

interface BackgroundProps {
  data: ComponentProps;
  children: React.ReactNode;
}

export default function Background({ data, children }: BackgroundProps) {
  const backgroundImageStyle =
    data.imagePosition === 'background' && data.image
      ? {
          backgroundImage: `url(${urlForImage(data.image)?.url() || '/meeting.jpeg'})`,
        }
      : {};

  return (
    <div
      className={clsx(
        'relative w-full',
        data && data,
        data.imagePosition === 'background' &&
          'min-h-screen md:min-h-0 lg:max-h-fit'
      )}
    >
      <div
        className={clsx(
          data.imagePosition === 'background' &&
            'z-0 bg-cover bg-fixed bg-center'
        )}
        style={backgroundImageStyle}
      >
        {data.imagePosition === 'background' && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-black/80" />
        )}
        {children}
      </div>
    </div>
  );
}
