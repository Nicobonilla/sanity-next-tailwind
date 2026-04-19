import { DocumentsIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'unitBusiness',
  title: 'Areas de practica',
  type: 'document',
  icon: DocumentsIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'unitBusiness' }),
    defineField({
      name: 'title',
      title: 'Titulo',
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
      title: 'Icono',
      type: 'string',
      options: {
        list: [
          { title: 'User', value: 'user' },
          { title: 'Menu', value: 'menu' },
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Rojo', value: 'bg-red-100 text-red-800' },
          { title: 'Azul', value: 'bg-blue-100 text-blue-800' },
          { title: 'Amarillo', value: 'bg-yellow-100 text-yellow-800' },
          { title: 'Verde', value: 'bg-green-100 text-green-800' },
          { title: 'Morado', value: 'bg-purple-100 text-purple-800' },
          { title: 'Naranja', value: 'bg-orange-100 text-orange-800' },
          { title: 'Gris', value: 'bg-gray-100 text-gray-800' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'services',
      title: 'Servicios',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'service' } }],
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      of: [{ type: 'banner' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
