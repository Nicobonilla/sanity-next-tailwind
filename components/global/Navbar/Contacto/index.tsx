import Link from 'next/link';
import { IoIosMail } from 'react-icons/io';
import { FaWhatsapp } from 'react-icons/fa';
import { useScrollContext } from '@/context/ScrollContext';

const Contacto = () => {
  const { scrolling } = useScrollContext();
  const colorText = scrolling ? 'gray' : 'white';

  return (
    <div
      className={`front-normal flex flex-row gap-8 pr-4 text-sm ${scrolling ? 'text-gray-500' : 'text-white'} `}
    >
      <button>
        <Link href={{ pathname: '/email-contacto' }} passHref>
          <IoIosMail size={24} color={colorText} />
        </Link>
      </button>

      <button>
        <Link href={{ pathname: '/whatsapp' }} passHref>
          <FaWhatsapp size={24} color={colorText} />
        </Link>
      </button>
    </div>
  );
};

export default Contacto;
