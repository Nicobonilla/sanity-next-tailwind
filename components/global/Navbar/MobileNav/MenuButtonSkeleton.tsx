import clsx from 'clsx';
import { IoIosMenu } from 'react-icons/io';

const MenuButtonSkeleton = () => (
  <div
    className={clsx(
      'menu-button z-50 mr-4 flex items-center justify-center rounded-md p-2 animate-pulse',
      'bg-gray-300 text-black opacity-75'
    )}
    aria-hidden="true" // Indica que es un placeholder visual, no interactivo
  >
    <IoIosMenu size={30} color="black" />
  </div>
);

export default MenuButtonSkeleton;