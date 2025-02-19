interface OverlayProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const Overlay = ({ isMenuOpen, closeMenu }: OverlayProps) => (
  <div
    className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
      isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
    }`}
    onClick={closeMenu}
  />
);
export default Overlay;