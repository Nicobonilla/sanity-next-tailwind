import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeProcessSection',
  title: 'Seccion metodologia',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Encabezado',
      type: 'sectionHeading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Pasos',
      type: 'array',
      of: [{ type: 'processStep' }],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
      subtitle: 'heading.eyebrow',
    },
  },
});
