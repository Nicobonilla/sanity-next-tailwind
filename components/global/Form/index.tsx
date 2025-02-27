'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import Logo from '@/components/global/Logo';
import Icon, { IconProps } from '@/components/global/Icons/LucideIcon';
import { useSanityContext } from '@/context/SanityContext';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import { useRouter } from 'next/navigation';
import ServiceSelector from './ServiceSelector';
import { trackFormSubmit } from '@/components/lib/GTMTrackers';

type TForm = {
  name: string;
  rut: string;
  phone: string;
  comuna: string;
  email: string;
  mainCategory: string;
  serviceCategory: string;
  message: string;
};

const initialForm: TForm = {
  name: '',
  rut: '',
  phone: '',
  comuna: '',
  email: '',
  mainCategory: '',
  serviceCategory: '',
  message: '',
};

async function sendEmail(formData: TForm) {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.status === 200) {
      toast.success('Email enviado correctamente');
      return true;
    } else {
      toast.error('Error al enviar el email');
      return false;
    }
  } catch (error) {
    toast.error('Error de red');
    return false;
  }
}

export default function Form() {
  const { isOpen, closeDrawer } = useContactDrawerContext();
  const { unitBusinessList } = useSanityContext();
  const [formData, setFormData] = useState<TForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Display text for the selected service
  const selectedServiceDisplay = formData.serviceCategory
    ? `${formData.serviceCategory}${formData.mainCategory ? ` - ${formData.mainCategory}` : ''}`
    : null;

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    trackFormSubmit('submited');
    //console.log('Form data:', formData);
    try {
      const success = await sendEmail(formData);
      if (success) {
        setFormData(initialForm);
        closeDrawer();
        router.push('/blog');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ha ocurrido un error al enviar el formulario');
    } finally {
      setIsLoading(false);
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.contact-drawer')) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDrawer]);

  return (
    <div className="relative z-50">
      {/* Overlay background */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Contact drawer */}
      <div
        className={`contact-drawer fixed right-0 top-0 z-50 h-screen overflow-hidden bg-black shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'w-full translate-x-0 sm:w-[480px]' : 'w-0 translate-x-full'
        }`}
      >
        <div className="relative h-full overflow-y-auto p-8">
          {/* Close button */}
          <button
            onClick={closeDrawer}
            className="absolute right-4 top-4 rounded-full p-1 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-menuColor2"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="mb-8 flex justify-center text-white">
            <Logo />
          </div>

          {/* Form content */}
          <div className="text-white">
            <h3 className="mb-4 text-center font-montserrat text-xl font-light">
              ¿Quieres Recibir más Información?
            </h3>
            <p className="mb-8 text-center font-bitter text-gray-300">
              Nos contactaremos contigo para resolver tus dudas
            </p>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Name field */}
              <InputField
                name="name"
                icon="user"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Nombre Completo"
              />

              {/* RUT field */}
              <InputField
                name="rut"
                icon="text"
                type="text"
                id="rut"
                value={formData.rut}
                placeholder="RUT"
                onChange={handleFormChange}
              />

              {/* Phone field */}
              <InputField
                name="phone"
                icon="phone"
                type="tel"
                id="phone"
                value={formData.phone}
                placeholder="Teléfono"
                onChange={handleFormChange}
              />

              {/* Email field */}
              <InputField
                name="email"
                icon="mail"
                type="email"
                id="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleFormChange}
              />

              {/* Comuna field */}
              <InputField
                name="comuna"
                icon="user"
                type="text"
                id="comuna"
                value={formData.comuna}
                placeholder="Comuna"
                onChange={handleFormChange}
              />

              {/* Service selector */}
              <ServiceSelector
                unitBusinessList={unitBusinessList}
                selectedService={selectedServiceDisplay}
                handleFormChange={handleFormChange}
              />

              {/* Message field */}
              <TextAreaField
                id="message"
                name="message"
                value={formData.message}
                placeholder="Escribe tu mensaje aquí..."
                onChange={handleFormChange}
              />

              {/* Submit button */}
              <SubmitButton isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable input field component
function InputField({
  name,
  icon,
  type,
  id,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  icon?: IconProps['name'];
  type: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <Icon
        name={icon as IconProps['name']}
        size={18}
        className="absolute left-3 top-3 text-gray-400"
      />
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
        onClick={() => trackFormSubmit(name)}
        className="w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
      />
    </div>
  );
}

// Reusable textarea component
function TextAreaField({
  id,
  name,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold" htmlFor={id}>
        Mensaje
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        value={value}
        className="w-full rounded bg-[#1a201f] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-menuColor2"
        placeholder={placeholder}
        onChange={onChange}
        onClick={() => trackFormSubmit(name)}
      />
    </div>
  );
}

// Submit button component
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-[#6C5CE7] px-8 py-3 font-medium text-white transition-colors hover:bg-[#5849c4] focus:outline-none focus:ring-2 focus:ring-menuColor2 disabled:opacity-50"
        onClick={() => trackFormSubmit('submit')}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </span>
        ) : (
          'Enviar'
        )}
      </button>
    </div>
  );
}
