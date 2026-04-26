'use client';

import { FaWhatsapp } from 'react-icons/fa';

import { trackWhatsappClick } from '@/components/lib/GTMTrackers';

export default function WhatsappSticky({ href }: { href: string }) {
  return (
    <a
      aria-label="Chat en WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-50 inline-flex min-h-14 max-w-[calc(100vw-2rem)] items-center justify-center gap-3 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 sm:left-auto sm:right-5 sm:max-w-none sm:justify-start"
      href={href}
      onClick={() => trackWhatsappClick('whatsapp_sticky')}
      rel="noreferrer"
      target="_blank"
    >
      <FaWhatsapp size={28} />
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
