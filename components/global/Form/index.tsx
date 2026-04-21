'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Logo from '@/components/global/Logo';
import Icon, { IconProps } from '@/components/global/Icons/LucideIcon';
import {
  trackLeadFormStart,
  trackLeadFormSubmitError,
  trackLeadFormSubmitSuccess,
} from '@/components/lib/GTMTrackers';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import {
  createInitialLeadForm,
  leadFormRequestSchema,
  visibleLeadFormSchema,
  type VisibleLeadFormData,
} from '@/lib/lead-form';
import { GetUnitBusinessListQueryResult } from '@/sanity.types';

import ServiceSelector from './ServiceSelector';

const formSchema = visibleLeadFormSchema;
type TForm = VisibleLeadFormData;

type TFormErrors = {
  [key in keyof TForm]?: string;
};

const initialForm = createInitialLeadForm();

const initialErrors: TFormErrors = {};

async function sendEmail(formData: TForm, submittedAt: number) {
  try {
    const requestBody = leadFormRequestSchema.parse({
      ...formData,
      submittedAt,
      website: '',
    });
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al enviar el email');
    }

    const data = await response.json();
    if (data.status === 200) {
      toast.success('Formulario enviado correctamente');
      return true;
    }

    toast.error(data.message || 'Error al enviar el email');
    return false;
  } catch (error) {
    console.error('Network error:', error);
    toast.error(error instanceof Error ? error.message : 'Error de red');
    return false;
  }
}

const initialTouched: Record<keyof TForm, boolean> = {
  name: false,
  rut: false,
  phone: false,
  comuna: false,
  email: false,
  consultationFormat: false,
  preferredDate: false,
  preferredTimeSlot: false,
  mainCategory: false,
  serviceCategory: false,
  message: false,
};

export default function Form({
  unitBusinessList,
  logo,
  slogan,
}: {
  unitBusinessList?: GetUnitBusinessListQueryResult;
  logo?: string | null;
  slogan?: string | null;
}) {
  const { isOpen, closeDrawer } = useContactDrawerContext();
  const [formData, setFormData] = useState<TForm>(initialForm);
  const [errors, setErrors] = useState<TFormErrors>(initialErrors);
  const [touched, setTouched] =
    useState<Record<keyof TForm, boolean>>(initialTouched);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [submittedAt, setSubmittedAt] = useState(() => Date.now());

  const selectedServiceDisplay =
    formData.mainCategory && formData.serviceCategory
      ? `${formData.mainCategory} - ${formData.serviceCategory}`
      : null;

  const validateField = (name: keyof TForm, value: string): string => {
    const fieldSchema = z.object({ [name]: formSchema.shape[name] });

    try {
      fieldSchema.parse({ [name]: value });
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === name);
        return fieldError?.message || '';
      }
      return '';
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
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
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof TForm;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (!hasTrackedStart && value.trim()) {
      trackLeadFormStart(fieldName);
      setHasTrackedStart(true);
    }

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

    const value = formData[name] || '';
    const error = validateField(name, String(value));
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key as keyof TForm] = true;
        return acc;
      },
      {} as Record<keyof TForm, boolean>
    );

    setTouched(allTouched);

    if (!validateForm()) {
      trackLeadFormSubmitError('validation_error');
      toast.error('Por favor, corrige los errores del formulario');
      return;
    }

    setIsLoading(true);

    try {
      const success = await sendEmail(formData, submittedAt);
      if (success) {
        trackLeadFormSubmitSuccess({
          areaTitle: formData.mainCategory || '',
          serviceTitle: formData.serviceCategory || '',
        });
        setFormData(createInitialLeadForm());
        setErrors(initialErrors);
        setTouched(initialTouched);
        setFormSubmitted(false);
        setHasTrackedStart(false);
        setSubmittedAt(Date.now());
        closeDrawer();
      } else {
        trackLeadFormSubmitError('api_error');
      }
    } catch (error) {
      console.error('Error:', error);
      trackLeadFormSubmitError('submit_exception');
      toast.error('Ha ocurrido un error al enviar el formulario');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
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

  useEffect(() => {
    if (!isOpen) {
      setFormData(createInitialLeadForm());
      setErrors(initialErrors);
      setTouched(initialTouched);
      setFormSubmitted(false);
      setHasTrackedStart(false);
      setSubmittedAt(Date.now());
    }
  }, [isOpen]);

  return (
    <div className="relative z-50">
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[color:rgba(31,39,51,0.45)] backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      <div
        className={`contact-drawer fixed right-0 top-0 z-50 h-screen max-w-[520px] overflow-hidden border-l border-[color:rgba(31,39,51,0.08)] bg-[color:var(--color-surface)] shadow-[var(--shadow-soft)] transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-[calc(100vw-1rem)] translate-x-0 sm:w-[520px]'
            : 'w-0 translate-x-full'
        }`}
      >
        <div className="relative h-full overflow-y-auto p-6 sm:p-8">
          <button
            aria-label="Cerrar"
            className="absolute right-4 top-4 rounded-full border border-[color:rgba(31,39,51,0.08)] p-2 text-[color:var(--color-text)] transition-colors duration-200 hover:border-[color:rgba(31,39,51,0.16)] hover:bg-[color:rgba(30,42,56,0.04)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(139,106,67,0.28)]"
            onClick={closeDrawer}
          >
            <X size={24} />
          </button>

          <div className="mb-10 flex justify-center border-b border-[color:rgba(31,39,51,0.08)] pb-8">
            <Logo logo={logo} slogan={slogan} />
          </div>

          <div className="text-[color:var(--color-text)]">
            <p className="eyebrow text-center">Consulta inicial</p>
            <h3 className="font-display mt-3 text-center text-4xl leading-tight text-[color:var(--color-primary)]">
              Solicite una consulta u orientacion inicial
            </h3>
            <p className="font-body mx-auto mb-8 mt-4 max-w-md text-center text-base leading-7 text-[color:var(--color-text-soft)]">
              Comparta sus antecedentes, modalidad preferida y horario tentativo.
              El estudio revisara su caso con seriedad y confidencialidad.
            </p>

            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div aria-hidden="true" className="hidden">
                <label htmlFor="website">Sitio web</label>
                <input
                  autoComplete="off"
                  id="website"
                  name="website"
                  readOnly
                  tabIndex={-1}
                  type="text"
                  value=""
                />
              </div>

              <InputField
                error={touched.name || formSubmitted ? errors.name : undefined}
                icon="user"
                id="name"
                name="name"
                onBlur={() => handleBlur('name')}
                onChange={handleFormChange}
                placeholder="Nombre completo"
                required
                type="text"
                value={formData.name}
              />

              <InputField
                error={touched.rut || formSubmitted ? errors.rut : undefined}
                icon="text"
                id="rut"
                name="rut"
                onBlur={() => handleBlur('rut')}
                onChange={handleFormChange}
                placeholder="RUT (ej: 12345678-9)"
                required
                type="text"
                value={formData.rut}
              />

              <InputField
                error={touched.phone || formSubmitted ? errors.phone : undefined}
                icon="phone"
                id="phone"
                name="phone"
                onBlur={() => handleBlur('phone')}
                onChange={handleFormChange}
                placeholder="Telefono (ej: +56 9 12345678)"
                required
                type="tel"
                value={formData.phone}
              />

              <InputField
                error={touched.email || formSubmitted ? errors.email : undefined}
                icon="mail"
                id="email"
                name="email"
                onBlur={() => handleBlur('email')}
                onChange={handleFormChange}
                placeholder="Correo electronico"
                required
                type="email"
                value={formData.email}
              />

              <InputField
                error={touched.comuna || formSubmitted ? errors.comuna : undefined}
                icon="user"
                id="comuna"
                name="comuna"
                onBlur={() => handleBlur('comuna')}
                onChange={handleFormChange}
                placeholder="Comuna"
                required
                type="text"
                value={formData.comuna}
              />

              <SelectField
                error={
                  touched.consultationFormat || formSubmitted
                    ? errors.consultationFormat
                    : undefined
                }
                id="consultationFormat"
                label="Modalidad preferida"
                name="consultationFormat"
                onBlur={() => handleBlur('consultationFormat')}
                onChange={handleFormChange}
                options={[
                  { label: 'Seleccione una modalidad', value: '' },
                  { label: 'Videollamada', value: 'Videollamada' },
                  { label: 'Llamada telefonica', value: 'Llamada telefonica' },
                  { label: 'WhatsApp', value: 'WhatsApp' },
                ]}
                required
                value={formData.consultationFormat}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  error={
                    touched.preferredDate || formSubmitted
                      ? errors.preferredDate
                      : undefined
                  }
                  icon="calendar"
                  id="preferredDate"
                  name="preferredDate"
                  onBlur={() => handleBlur('preferredDate')}
                  onChange={handleFormChange}
                  placeholder="Fecha preferida"
                  type="date"
                  value={formData.preferredDate || ''}
                />

                <SelectField
                  error={
                    touched.preferredTimeSlot || formSubmitted
                      ? errors.preferredTimeSlot
                      : undefined
                  }
                  id="preferredTimeSlot"
                  label="Bloque horario preferido"
                  name="preferredTimeSlot"
                  onBlur={() => handleBlur('preferredTimeSlot')}
                  onChange={handleFormChange}
                  options={[
                    { label: 'Sin preferencia horaria', value: '' },
                    { label: '09:00 a 12:00', value: '09:00 a 12:00' },
                    { label: '12:00 a 15:00', value: '12:00 a 15:00' },
                    { label: '15:00 a 18:00', value: '15:00 a 18:00' },
                  ]}
                  value={formData.preferredTimeSlot || ''}
                />
              </div>

              <div className="space-y-1">
                <ServiceSelector
                  handleFormChange={handleFormChange}
                  selectedService={selectedServiceDisplay}
                  unitBusinessList={unitBusinessList || []}
                />
                {(touched.serviceCategory || formSubmitted) && errors.serviceCategory ? (
                  <p className="px-1 text-xs text-red-600">
                    {errors.serviceCategory}
                  </p>
                ) : null}
              </div>

              <TextAreaField
                error={touched.message || formSubmitted ? errors.message : undefined}
                id="message"
                name="message"
                onBlur={() => handleBlur('message')}
                onChange={handleFormChange}
                placeholder="Describa brevemente su consulta"
                value={formData.message || ''}
              />

              <input name="submittedAt" readOnly type="hidden" value={submittedAt} />
              <SubmitButton isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="relative space-y-1">
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-text-soft)]"
          name={icon as IconProps['name']}
          size={18}
        />
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={`input-shell w-full py-3 pl-11 pr-4 ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          }`}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      </div>
      {error ? (
        <p className="px-1 text-xs text-red-600" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  error,
  id,
  label,
  name,
  onBlur,
  onChange,
  options,
  required = false,
  value,
}: {
  error?: string;
  id: string;
  label: string;
  name: string;
  onBlur?: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  options: Array<{ label: string; value: string }>;
  required?: boolean;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <label
        className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-text-soft)]"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`input-shell w-full ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        value={value}
      >
        {options.map((option) => (
          <option key={`${id}-${option.value || 'empty'}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="px-1 text-xs text-red-600" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onBlur?: () => void;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <label
        className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-text-soft)]"
        htmlFor={id}
      >
        Mensaje
      </label>
      <textarea
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`textarea-shell min-h-[132px] w-full ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        value={value}
      />
      {error ? (
        <p className="px-1 text-xs text-red-600" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="flex justify-center pt-2">
      <button
        className="button-primary min-w-[220px] justify-center disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="size-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
            Enviando...
          </span>
        ) : (
          'Solicitar consulta'
        )}
      </button>
    </div>
  );
}
