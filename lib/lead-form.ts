import { z } from 'zod';

export const visibleLeadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'El nombre es requerido (minimo 3 caracteres)' }),
  rut: z.string().trim().refine(
    (value) => {
      const cleanRut = value.replace(/[.-]/g, '');
      const rutRegex = /^(\d{1,8})([0-9K])$/i;
      return rutRegex.test(cleanRut);
    },
    { message: 'RUT invalido' }
  ),
  phone: z.string().trim().refine(
    (value) => {
      const phoneRegex = /^(\+?56)?(\s?)(9)(\s?)[98765432]\d{7}$/;
      return phoneRegex.test(value);
    },
    { message: 'Numero de telefono invalido (debe tener 9 digitos)' }
  ),
  comuna: z.string().trim().min(2, { message: 'Comuna es requerida' }),
  email: z.string().trim().email({ message: 'Email invalido' }),
  mainCategory: z.string().trim().min(1, {
    message: 'Selecciona un area de practica',
  }),
  serviceCategory: z.string().trim().min(1, {
    message: 'Selecciona un servicio',
  }),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
});

export const leadFormRequestSchema = visibleLeadFormSchema.extend({
  submittedAt: z.number().int().positive(),
  website: z.string().trim().max(0).optional().default(''),
});

export type VisibleLeadFormData = z.infer<typeof visibleLeadFormSchema>;
export type LeadFormRequestData = z.infer<typeof leadFormRequestSchema>;

export function createInitialLeadForm(): VisibleLeadFormData {
  return {
    comuna: '',
    email: '',
    mainCategory: '',
    message: '',
    name: '',
    phone: '',
    rut: '',
    serviceCategory: '',
  };
}
