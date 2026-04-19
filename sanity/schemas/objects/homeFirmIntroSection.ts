import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeFirmIntroSection',
  title: 'Intro del estudio',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Encabezado',
      type: 'sectionHeading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Parrafos',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (rule) => rule.min(1).max(3),
    }),
    defineField({
      name: 'cards',
      title: 'Tarjetas informativas',
      type: 'array',
      of: [{ type: 'labelValueItem' }],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: 'heading.title',
      subtitle: 'heading.eyebrow',
    },
  },
});
