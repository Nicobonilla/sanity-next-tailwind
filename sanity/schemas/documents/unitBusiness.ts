import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';

export default defineType({
  name: 'unitBusiness',
  title: 'Unidades de Negocios',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'User', value: 'user' },
          { title: 'Menu', value: 'menu' },
          // Agrega más íconos según sea necesario
        ],
      },
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
        },
      ], // Para contenido enriquecido
    }),
  ],
});
