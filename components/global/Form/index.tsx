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
//import { trackFormSubmit } from '@/components/lib/GTMTrackers';
import { z } from 'zod';

// Define Zod schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre es requerido (mínimo 3 caracteres)' }),
  rut: z.string().refine(
    (value) => {
      // Basic RUT validation (Chilean ID)
      if (!value) return false;
      const cleanRut = value.replace(/[.-]/g, '');
      const rutRegex = /^(\d{1,8})([0-9K])$/;
      return rutRegex.test(cleanRut);
    },
    { message: 'RUT inválido' }
  ),
  phone: z.string().refine(
    (value) => {
      // Chilean phone number validation
      const phoneRegex = /^(\+?56)?(\s?)(9)(\s?)[98765432]\d{7}$/;
      return phoneRegex.test(value);
    },
    { message: 'Número de teléfono inválido (debe tener 9 dígitos)' }
  ),
  comuna: z.string().min(2, { message: 'Comuna es requerida' }),
  email: z.string().email({ message: 'Email inválido' }),
  mainCategory: z.string().optional(),
  serviceCategory: z.string().min(1, { message: 'Selecciona un servicio' }),
  message: z.string().optional(),
});

// Infer the type from the schema
type TForm = z.infer<typeof formSchema>;

// Type for form errors
type TFormErrors = {
  [key in keyof TForm]?: string;
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

const initialErrors: TFormErrors = {};

async function sendEmail(formData: TForm) {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al enviar el email');
    }

    const data = await response.json();
    if (data.status === 200) {
      toast.success('Email enviado correctamente');
      return true;
    } else {
      toast.error(data.message || 'Error al enviar el email');
      return false;
    }
  } catch (error) {
    console.error('Network error:', error);
    toast.error(error instanceof Error ? error.message : 'Error de red');
    return false;
  }
}

export default function Form() {
  const { isOpen, closeDrawer } = useContactDrawerContext();
  const { unitBusinessList } = useSanityContext();
  const [formData, setFormData] = useState<TForm>(initialForm);
  const [errors, setErrors] = useState<TFormErrors>(initialErrors);
  const [touched, setTouched] = useState<Record<keyof TForm, boolean>>({
    name: false,
    rut: false,
    phone: false,
    comuna: false,
    email: false,
    mainCategory: false,
    serviceCategory: false,
    message: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  // Display text for the selected service
  const selectedServiceDisplay = formData.serviceCategory
    ? `${formData.serviceCategory}${formData.mainCategory ? ` - ${formData.mainCategory}` : ''}`
    : null;

  // Validate a single field using Zod
  const validateField = (name: keyof TForm, value: string): string => {
    // Create a partial schema for just this field
    const fieldSchema = z.object({ [name]: formSchema.shape[name] });

    try {
      // Validate just this field
      fieldSchema.parse({ [name]: value });
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract the error message for this field
        const fieldError = error.errors.find((err) => err.path[0] === name);
        return fieldError?.message || '';
      }
      return '';
    }
  };

  // Validate all fields using Zod
  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to our error format
        const newErrors: TFormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof TForm;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof TForm;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Validate on change if the field has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  };

  const handleBlur = (name: keyof TForm) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const error = validateField(name, formData[name] || '');
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    // Mark all fields as touched when submitting
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key as keyof TForm] = true;
        return acc;
      },
      {} as Record<keyof TForm, boolean>
    );

    setTouched(allTouched);

    // Validate all fields before submission
    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setIsLoading(true);
    //trackFormSubmit('submited');

    try {
      const success = await sendEmail(formData);
      if (success) {
        setFormData(initialForm);
        setErrors(initialErrors);
        setTouched({
          name: false,
          rut: false,
          phone: false,
          comuna: false,
          email: false,
          mainCategory: false,
          serviceCategory: false,
          message: false,
        });
        setFormSubmitted(false);
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

  // Reset form when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setErrors(initialErrors);
      setTouched({
        name: false,
        rut: false,
        phone: false,
        comuna: false,
        email: false,
        mainCategory: false,
        serviceCategory: false,
        message: false,
      });
      setFormSubmitted(false);
    }
  }, [isOpen]);

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
                onBlur={() => handleBlur('name')}
                placeholder="Nombre Completo"
                error={touched.name || formSubmitted ? errors.name : undefined}
                required
              />

              {/* RUT field */}
              <InputField
                name="rut"
                icon="text"
                type="text"
                id="rut"
                value={formData.rut}
                placeholder="RUT (ej: 12345678-9)"
                onChange={handleFormChange}
                onBlur={() => handleBlur('rut')}
                error={touched.rut || formSubmitted ? errors.rut : undefined}
                required
              />

              {/* Phone field */}
              <InputField
                name="phone"
                icon="phone"
                type="tel"
                id="phone"
                value={formData.phone}
                placeholder="Teléfono (ej: +56 9 12345678)"
                onChange={handleFormChange}
                onBlur={() => handleBlur('phone')}
                error={
                  touched.phone || formSubmitted ? errors.phone : undefined
                }
                required
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
                onBlur={() => handleBlur('email')}
                error={
                  touched.email || formSubmitted ? errors.email : undefined
                }
                required
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
                onBlur={() => handleBlur('comuna')}
                error={
                  touched.comuna || formSubmitted ? errors.comuna : undefined
                }
                required
              />

              {/* Service selector */}
              <div className="space-y-1">
                <ServiceSelector
                  unitBusinessList={unitBusinessList}
                  selectedService={selectedServiceDisplay}
                  handleFormChange={handleFormChange}
                />
                {(touched.serviceCategory || formSubmitted) &&
                  errors.serviceCategory && (
                    <p className="text-xs text-red-500">
                      {errors.serviceCategory}
                    </p>
                  )}
              </div>

              {/* Message field */}
              <TextAreaField
                id="message"
                name="message"
                value={formData.message || ''}
                placeholder="Escribe tu mensaje aquí..."
                onChange={handleFormChange}
                onBlur={() => handleBlur('message')}
                error={
                  touched.message || formSubmitted ? errors.message : undefined
                }
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
  onBlur,
  error,
  required = false,
}: {
  name: string;
  icon?: IconProps['name'];
  type: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="relative space-y-1">
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
          onBlur={onBlur}
          required={required}
          onClick={() => trackFormSubmit(name)}
          className={`w-full rounded bg-[#1a201f] py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            error
              ? 'border border-red-500 focus:ring-red-500'
              : 'focus:ring-menuColor2'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {required && false && (
          <span className="absolute right-3 top-3 text-red-500">*</span>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
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
  onBlur,
  error,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="mb-2 block text-sm font-bold" htmlFor={id}>
        Mensaje
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        value={value}
        className={`w-full rounded bg-[#1a201f] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border border-red-500 focus:ring-red-500'
            : 'focus:ring-menuColor2'
        }`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onClick={() => trackFormSubmit(name)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
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
