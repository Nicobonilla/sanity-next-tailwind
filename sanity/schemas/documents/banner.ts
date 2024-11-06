import { defineType, defineField } from 'sanity';

const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document', // Tipo de documento
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título del Banner',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Descripción del Banner',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenido del Banner',
      of: [{ type: 'block' }], // Portable Text
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'typeComponent',
      type: 'reference',
      title: 'Tipo de Componente',
      to: [{ type: 'component' }],
    }),
    defineField({
      title: 'Invertir Layout Mobile',
      name: 'invertLayoutMobile',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Invertir Layout Desk',
      name: 'invertLayoutDesk',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'item' }],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      type: 'typeComponent.value',
    },
    prepare({ title, type }) {
      return {
        title: title,
        subtitle: type,
      };
    },
  },
});

export default banner;
