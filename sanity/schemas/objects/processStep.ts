import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'processStep',
  title: 'Paso del proceso',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Paso',
      type: 'string',
      initialValue: '01',
      validation: (rule) => rule.required().max(8),
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
      validation: (rule) => rule.required().max(220),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'step',
    },
    prepare({ subtitle, title }) {
      return {
        title: title || 'Paso sin titulo',
        subtitle: subtitle ? `Paso ${subtitle}` : 'Sin orden',
      };
    },
  },
});
