import { IoIosMenu, IoIosClose } from 'react-icons/io';

interface MenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: (e: React.MouseEvent) => void;
}

const MenuButton = ({ isMenuOpen, toggleMenu }: MenuButtonProps) => (
  <button
    onClick={toggleMenu}
    className="mr-4 flex items-center justify-center text-black"
    aria-expanded={isMenuOpen}
    aria-controls="mobile-menu"
  >
    {isMenuOpen ? <IoIosClose size={30} /> : <IoIosMenu size={30} />}
  </button>
);
export default MenuButton;
