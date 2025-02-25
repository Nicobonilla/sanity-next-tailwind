'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Logo from '@/components/global/Logo';
import Icon, { IconProps } from '@/components/global/Icons/LucideIcon';
import { useSanityContext } from '@/context/SanityContext';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import ServiceSelector from './ServiceSelector';

export default function Form() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { isOpen, closeDrawer } = useContactDrawerContext();
  const { unitBusinessList } = useSanityContext();

  // Cierra el cajón al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.contact-drawer')) {
        closeDrawer();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, closeDrawer]);

  return (
    <div className="relative z-50">
      {/* Fondo oscuro */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      {/* Cajón de contacto */}
      <div
        className={`contact-drawer fixed right-0 top-0 z-50 h-screen bg-black shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'w-full translate-x-0 sm:w-[480px]' : 'w-0 translate-x-full'
        }`}
      >
        <div className="relative h-full overflow-y-auto p-8">
          {/* Botón para cerrar */}
          <button
            onClick={closeDrawer}
            className="absolute right-4 top-4 text-white hover:opacity-70"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="mb-8 flex justify-center text-white">
            <Logo />
          </div>

          {/* Contenido del formulario */}
          <div className="text-white">
            <h3 className="mb-4 text-center font-montserrat text-xl font-light">
              ¿Quieres Recibir más Información?
            </h3>
            <p className="mb-8 text-center font-bitter text-gray-300">
              Nos contactaremos contigo para resolver tus dudas
            </p>

            <form className="space-y-6">
              {/* Campo de nombre */}
              <InputField
                icon="user"
                type="text"
                id="name"
                placeholder="Nombre"
              />

              {/* Campo de teléfono */}
              <InputField
                icon="phone"
                type="tel"
                id="phone"
                placeholder="Teléfono"
              />

              {/* Campo de email */}
              <InputField
                icon="mail"
                type="email"
                id="email"
                placeholder="Email"
              />

              {/* Selector de servicios */}
              <ServiceSelector
                unitBusinessList={unitBusinessList}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />

              {/* Campo de mensaje */}
              <TextAreaField
                id="message"
                placeholder="Escribe tu mensaje aquí..."
              />

              {/* Botón de enviar */}
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente reutilizable para campos de entrada
function InputField({
  icon,
  type,
  id,
  placeholder,
}: {
  icon: IconProps['name'];
  type: string;
  id: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Icon
        name={icon}
        size={18}
        className="absolute left-3 top-3 text-gray-400"
      />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required
        className="w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
      />
    </div>
  );
}

// Componente reutilizable para el área de texto
function TextAreaField({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold" htmlFor={id}>
        Mensaje
      </label>
      <textarea
        id={id}
        rows={4}
        className="w-full rounded bg-[#1a201f] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
        placeholder={placeholder}
      />
    </div>
  );
}

// Componente reutilizable para el botón de enviar
function SubmitButton() {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="rounded bg-[#6C5CE7] px-8 py-3 font-medium text-white transition-colors hover:bg-[#5849c4]"
      >
        Enviar
      </button>
    </div>
  );
}
