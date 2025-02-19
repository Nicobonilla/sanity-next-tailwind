'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Logo from '@/components/global/Logo';
import Icon from '@/components/global/Icons/LucideIcon';
import { useSanityContext } from '@/context/SanityContext';
import { useContactDrawer } from '@/context/ContactDrawerContext';
import type { GetUnitBusinessListQueryResult } from '@/sanity.types';
import ServiceSelector from './ServiceSelector';

export default function Form() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { isOpen, closeDrawer } = useContactDrawer();
  const { unitBusinessList } = useSanityContext();

  useEffect(() => {
    const closeDrawerOnClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.contact-drawer')) {
        closeDrawer();
      }
    };

    if (isOpen) {
      window.addEventListener('click', closeDrawerOnClickOutside);
    }

    return () => {
      window.removeEventListener('click', closeDrawerOnClickOutside);
    };
  }, [isOpen, closeDrawer]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      <div
        className={`contact-drawer fixed right-0 top-0 z-50 h-screen bg-black shadow-lg transition-all duration-500 ease-in-out ${
          isOpen ? 'w-full translate-x-0 sm:w-[480px]' : 'w-0 translate-x-full'
        }`}
      >
        <div className="relative h-full overflow-y-auto p-8">
          <button
            onClick={closeDrawer}
            className="absolute right-4 top-4 text-white hover:opacity-70"
          >
            <X size={24} />
            <span className="sr-only">Close</span>
          </button>

          <div className="mb-8 flex justify-center text-white">
            <Logo />
          </div>

          <div className="text-white">
            <h3 className="mb-4 text-center font-montserrat text-xl font-semibold">
              ¿Quieres Recibir más Información?
            </h3>
            <p className="mb-8 text-center font-bitter text-gray-300">
              Nos contactaremos contigo para resolver tus dudas
            </p>

            <form className="space-y-6">
              <div className="relative">
                <Icon
                  name="user"
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  required
                  className="w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                />
              </div>

              <div className="relative">
                <Icon
                  name="phone"
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="tel"
                  id="phone"
                  placeholder="Teléfono"
                  required
                  className="w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                />
              </div>

              <div className="relative">
                <Icon
                  name="mail"
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  className="w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                />
              </div>

              {/* Usa el subcomponente ServiceSelector */}
              <ServiceSelector
                unitBusinessList={unitBusinessList}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />

              <div>
                <label
                  className="mb-2 block text-sm font-bold"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded bg-[#1a201f] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded bg-[#6C5CE7] px-8 py-3 font-medium text-white transition-colors hover:bg-[#5849c4]"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
