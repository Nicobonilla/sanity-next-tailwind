import { DocumentsIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

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
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
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
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'unitBusiness',
      title: 'Unidad de negocio',
      type: 'reference',
      to: [{ type: 'unitBusiness' }],
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      description:
        'Texto breve para tarjetas y listados. Si se deja vacio, el frontend usara el primer parrafo disponible.',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'components',
      title: 'Componentes',
      type: 'array',
      of: [{ type: 'banner' }],
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'contentCta',
      title: 'CTA de contacto del articulo',
      type: 'contactCta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
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
