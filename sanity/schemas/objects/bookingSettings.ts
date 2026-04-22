import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'bookingSettings',
  title: 'Agenda virtual',
  type: 'object',
  fields: [
    defineField({
      name: 'isEnabled',
      title: 'Activar agenda',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Titulo de apoyo',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texto del boton',
      type: 'string',
      initialValue: 'Agendar videollamada',
      validation: (rule) => rule.max(50),
    }),
    defineField({
      name: 'bookingUrl',
      title: 'URL externa de agenda',
      description:
        'Opcional. Pegue aqui la URL publica de Google Appointment Schedule o servicio equivalente. Si se deja vacia, la web usa el formulario para solicitar fecha y horario preferidos.',
      type: 'url',
    }),
    defineField({
      name: 'availabilityNote',
      title: 'Nota de disponibilidad',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'durationLabel',
      title: 'Duracion referencial',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Etiqueta comercial',
      description: 'Ejemplo: Orientacion inicial o Consulta virtual.',
      type: 'string',
      validation: (rule) => rule.max(50),
    }),
  ],
  preview: {
    select: {
      title: 'buttonLabel',
      subtitle: 'availabilityNote',
    },
    prepare({ subtitle, title }) {
      return {
        title: title || 'Agenda virtual',
        subtitle: subtitle || 'Sin nota de disponibilidad',
      };
    },
  },
});
