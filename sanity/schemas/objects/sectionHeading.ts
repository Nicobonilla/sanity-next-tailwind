import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sectionHeading',
  title: 'Encabezado de seccion',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Etiqueta',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
    prepare({ subtitle, title }) {
      return {
        title: title || 'Encabezado sin titulo',
        subtitle: subtitle || 'Sin etiqueta',
      };
    },
  },
});
