import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'labelValueItem',
  title: 'Etiqueta y valor',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'value',
      title: 'Valor',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
});
