import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePracticeAreasSection',
  title: 'Seccion areas de practica',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Encabezado',
      type: 'sectionHeading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'maxItems',
      title: 'Cantidad maxima de areas a mostrar',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: 'servicesLabel',
      title: 'Etiqueta de servicios relacionados',
      type: 'string',
      initialValue: 'Servicios relacionados',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'detailLabel',
      title: 'Texto del enlace',
      type: 'string',
      initialValue: 'Ver detalle',
      validation: (rule) => rule.max(40),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
      subtitle: 'heading.eyebrow',
    },
  },
});
