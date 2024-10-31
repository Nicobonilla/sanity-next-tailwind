import { defineType, defineField } from 'sanity';

const component = defineType({
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

export default component;
