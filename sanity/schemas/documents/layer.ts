import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'layer',
  title: 'Layer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Valor',
      type: 'string',
    }),
  ],
});