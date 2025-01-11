import { urlForImage } from '@/sanity/lib/utils';
import clsx from 'clsx';
import { ComponentProps } from '@/components/pages/PageTemplate';

interface BackgroundProps {
  data: ComponentProps;
  children: React.ReactNode;
}

export default function Background({ data, children }: BackgroundProps) {
  // Helper function to create rgba string from color object
  const getRgbaString = (color: any, position?: number) => {
    if (!color?.rgb) return 'transparent';
    const { r, g, b, a } = color.rgb;
    return position !== undefined
      ? `rgba(${r}, ${g}, ${b}, ${a}) ${position}%`
      : `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  // Create background styles based on mode
  const getBackgroundStyle = () => {
    if (data.backgroundMode === 'image' && data.image) {
      return {
        backgroundImage: `url(${urlForImage(data.image)?.url() || '/meeting.jpeg'})`,
        backgroundColor: getRgbaString(data.colorBackground1),
      };
    }

    if (data.backgroundMode === 'colors') {
      // Single color background
      if (!data.colorBackground2) {
        return {
          backgroundColor: getRgbaString(data.colorBackground1),
        };
      }

      // Two color gradient
      if (!data.colorBackground3) {
        return {
          background: `linear-gradient(
      ${(data?.directionDeg || 0) + 135}deg,
      ${getRgbaString(data.colorBackground1, data.colorBackground1Position || 0)},
      ${getRgbaString(data.colorBackground2, data.colorBackground2Position || 100)}
    )`,
        };
      }

      // Three color gradient
      return {
        background: `linear-gradient(
          to right,
          ${getRgbaString(data.colorBackground1, data.colorBackground1Position || 0)},
          ${getRgbaString(data.colorBackground2, data.colorBackground2Position || 50)},
          ${getRgbaString(data.colorBackground3, data.colorBackground3Position || 100)}
        )`,
      };
    }

    return {};
  };

  return (
    <div
      className={clsx(
        'relative w-full',
        data.backgroundMode === 'image' &&
          'min-h-screen md:min-h-0 lg:max-h-fit'
      )}
    >
      <div
        className={clsx(
          'z-0',
          data.backgroundMode === 'image' && 'bg-cover bg-fixed bg-center'
        )}
        style={getBackgroundStyle()}
      >
        {data.backgroundMode === 'image' && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-black/80" />
        )}
        {children}
      </div>
    </div>
  );
}
