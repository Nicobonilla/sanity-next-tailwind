import clsx from 'clsx';
export type LayerProps = {
  layer: string;
  activeTheme: string;
};

export default function Layer({
  layer,
  activeTheme,
}: LayerProps): JSX.Element | undefined {
  switch (layer) {
    case 'layer2':
      return (
        <div className="relative inset-0 z-20">
          <div className="absolute inset-0 z-10 transition-colors duration-300" />
          <div className="layer layer1 z-20 bg-gray-100 dark:bg-black" />
          <div className="layer layer2 z-30 bg-gray-100/70 dark:bg-black/60" />
          <div className="layer layer3 z-40 bg-gray-100/40 dark:bg-black/40" />
        </div>
      );
    default:
      return (
        <div
          className={clsx(
            'absolute inset-0 z-10 transition-colors duration-300',
            activeTheme === 'light' ? 'bg-white/80' : 'bg-black/80'
          )}
        />
      );
  }
}
