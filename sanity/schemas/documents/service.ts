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
      name: 'keywords',
      title: 'Palabras claves para SEO',
      type: 'array',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Detalles del servicio',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
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
