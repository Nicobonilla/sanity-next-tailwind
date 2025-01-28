import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'component',
  title: 'Componente',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre de Componente',
    }),
    defineField({
      name: 'value',
      type: 'string',
      title: 'Variable de Componente',
    }),
  ],
});