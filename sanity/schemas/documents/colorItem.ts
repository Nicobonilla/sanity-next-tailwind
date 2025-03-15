import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'colorItem',
  title: 'Color',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Color',
      type: 'string',
    }),
    defineField({
      name: 'lightColor',
      title: 'Color claro',
      type: 'color',
    }),
    defineField({
      name: 'position',
      title: 'Posicion Color de Fondo 1',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
      };
    },
  },
});
