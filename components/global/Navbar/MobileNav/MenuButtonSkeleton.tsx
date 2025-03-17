import clsx from 'clsx';
import { IoIosMenu } from 'react-icons/io';

const MenuButtonSkeleton = () => (
  <button
    className={clsx('menu-button z-50 mr-4 flex items-center justify-center')}
    aria-expanded={false}
    aria-controls="mobile-menu"
    aria-label={'Close menu'}
  >
    <div className="text-black">
      <IoIosMenu size={30} color={'black'} />
    </div>
  </button>
);

export default MenuButtonSkeleton;
