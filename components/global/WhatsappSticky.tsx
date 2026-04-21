'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

import { trackWhatsappClick } from '@/components/lib/GTMTrackers';

export default function WhatsappSticky({ href }: { href: string }) {
  return (
    <Link
      aria-label="Chat en WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-3 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-transform hover:scale-105"
      href={href}
      onClick={() => trackWhatsappClick('whatsapp_sticky')}
      rel="noreferrer"
      target="_blank"
    >
      <FaWhatsapp size={32} />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </Link>
  );
}
