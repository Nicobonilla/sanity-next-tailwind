import clsx from 'clsx';
import { IoIosMenu, IoIosClose } from 'react-icons/io';

interface MenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MenuButton = ({ isMenuOpen, toggleMenu }: MenuButtonProps) => (
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevent event bubbling
      toggleMenu();
    }}
    className={clsx('menu-button z-50 mr-4 flex items-center justify-center')}
    aria-expanded={isMenuOpen}
    aria-controls="mobile-menu"
    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
  >
    {isMenuOpen ? (
      <div className="text-white">
        <IoIosClose size={30} color={'white'} />
      </div>
    ) : (
      <div className="text-black">
        <IoIosMenu size={30} color={'black'} />
      </div>
    )}
  </button>
);

export default MenuButton;
