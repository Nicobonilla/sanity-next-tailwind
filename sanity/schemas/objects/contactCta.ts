import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactCta',
  title: 'CTA de contacto',
  type: 'object',
  fields: [
    defineField({
      name: 'isEnabled',
      title: 'Activar',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Etiqueta',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'primaryLabel',
      title: 'Texto boton principal',
      type: 'string',
      initialValue: 'Solicitar orientacion',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'secondaryLabel',
      title: 'Texto boton secundario',
      type: 'string',
      initialValue: 'Llamar ahora',
      validation: (rule) => rule.max(40),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ subtitle, title }) {
      return {
        title: title || 'CTA sin titulo',
        subtitle: subtitle || 'Sin descripcion',
      };
    },
  },
});
