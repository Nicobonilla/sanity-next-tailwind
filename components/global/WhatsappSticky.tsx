import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsappSticky() {
  return (
    <Link
      href="https://wa.me/+56933596955" // Reemplaza con tu número de WhatsApp
      target="_blank"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 p-3 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat en WhatsApp"
    >
      <FaWhatsapp size={32} />
    </Link>
  );
}
