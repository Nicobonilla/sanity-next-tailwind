import clsx from 'clsx';

interface OverlayProps {
  isMenuOpen: boolean;
}

const Overlay = ({ isMenuOpen }: OverlayProps) => (
  <div
    className={clsx(
      'fixed inset-0 z-30 bg-black/70 transition-opacity duration-300',
      isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
    )}
    aria-hidden="true"
  />
);

export default Overlay;
