import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';
import { isUniqueAcrossAllDocuments } from '@/sanity/lib/utils';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  orderings: [orderRankOrdering],
  icon: DocumentsIcon,
  fields: [
    orderRankField({ type: 'service' }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Activar',
      name: 'isActive',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'icon.manager',
      name: 'iconfyIcon',
      title: 'Icon Manager',
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
    }),
    defineField({
      name: 'seo',
      title: 'SEO y redes sociales',
      type: 'seo',
    }),
    defineField({
      name: 'content',
      title: 'Detalles del servicio',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              validation: (rule) =>
                rule.custom((alt, context) => {
                  const parent = context.parent as
                    | { asset?: { _ref?: string } }
                    | undefined;
                  return parent?.asset?._ref && !alt
                    ? 'Agrega un texto alternativo para la imagen.'
                    : true;
                }),
            }),
          ],
        },
      ], // Para contenido enriquecido
    }),
    defineField({
      name: 'unitBusiness',
      title: 'Unidad de Negocio',
      type: 'reference',
      to: [{ type: 'unitBusiness' }],
      description: 'Select the unit business this service belongs to',
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
      active: 'isActive',
      unitBusiness: 'unitBusiness.title',
      icon: 'iconftyIcon.icon',
    },
    prepare({ title, active, unitBusiness, icon }) {
      return {
        title: `${title} | ${active ? 'Activo' : 'Inactivo'}`,
        subtitle: `${unitBusiness}`,
        media: icon,
      };
    },
  },
});
