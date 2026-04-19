import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeFaqSection',
  title: 'Seccion preguntas frecuentes',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Encabezado',
      type: 'sectionHeading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Preguntas',
      type: 'array',
      of: [{ type: 'faqItem' }],
      validation: (rule) => rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
      subtitle: 'heading.eyebrow',
    },
  },
});
