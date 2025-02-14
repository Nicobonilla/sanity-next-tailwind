import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default defineType({
  name: 'post',
  title: 'Blog',
  type: 'document',
  icon: DocumentsIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'post' }),
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
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Quote', value: 'blockquote' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'unitBusiness',
      title: 'Unidad de Negocio',
      type: 'reference',
      to: [{ type: 'unitBusiness' }],
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      description:
        'Texto para lista de Posts. (Si está vacio se mostrarán los 100 primeros caracteres del primer parrafo: estilo normal")',
      type: 'text',
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      of: [{ type: 'banner' }], // Para contenido enriquecido
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      uBusiness: 'unitBusiness.title',
      media: 'components.imageBackground',
    },
    prepare({ title, media, uBusiness, date }) {
      const subtitles = [
        uBusiness && uBusiness,
        date && `${format(parseISO(date), 'dd/MM/yy')}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(' ') };
    },
  },
});
