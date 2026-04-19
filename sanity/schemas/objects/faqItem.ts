import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'Pregunta frecuente',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
});
